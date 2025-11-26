
/**
 * LUNO STUDIOS BACKEND
 * Handles Google Calendar Booking & n8n Automation & Retell AI
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);

// --- MIDDLEWARE ---
app.use(helmet());
app.use(cors()); 
app.use(express.json());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// --- CONFIGURATION ---
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID; 
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL; // Default/Receptionist webhook
const N8N_WEBSITE_WEBHOOK_URL = process.env.N8N_WEBSITE_WEBHOOK_URL; // Website webhook
const RETELL_API_KEY = process.env.RETELL_API_KEY;
const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID;
const KEY_FILE_PATH = path.join(__dirname, 'service_account.json');

// --- GOOGLE CALENDAR SETUP ---
let calendar = null;
let serviceAccountEmail = '';

const initCalendar = async () => {
  let credentials = null;

  // Only use local file (Best for Local Dev)
  if (fs.existsSync(KEY_FILE_PATH)) {
    try {
      credentials = JSON.parse(fs.readFileSync(KEY_FILE_PATH, 'utf8'));
      console.log('LOCAL: Loaded credentials from service_account.json file.');
    } catch (e) {
      console.error('❌ Failed to read service_account.json file');
    }
  } else if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      // Support for Render/Cloud environment variables
      try {
          credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
          console.log('CLOUD: Loaded credentials from environment variable.');
      } catch (e) {
          console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON');
      }
  }

  if (!credentials) {
    console.warn('⚠️  WARNING: No service_account.json found. Calendar features disabled.');
    return;
  }

  if (!CALENDAR_ID) {
    console.warn('⚠️  WARNING: GOOGLE_CALENDAR_ID is missing in .env file.');
    return;
  }

  try {
    serviceAccountEmail = credentials.client_email;
    console.log(`🔑 Authenticated as: ${serviceAccountEmail}`);

    const auth = new google.auth.GoogleAuth({
      credentials, 
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const client = await auth.getClient();
    const tempCalendar = google.calendar({ version: 'v3', auth: client });
    
    try {
      // Check access specifically for the target calendar
      await tempCalendar.calendars.get({ calendarId: CALENDAR_ID });
      console.log(`✅ Connection Successful! Connected to calendar: ${CALENDAR_ID}`);
      calendar = tempCalendar;
    } catch (err) {
      console.warn(`⚠️  Initial access failed: ${err.message}`);
      console.log('   Attempting to force-add calendar to Service Account list...');
      
      try {
        // Force add the calendar to the service account's list
        await tempCalendar.calendarList.insert({ requestBody: { id: CALENDAR_ID } });
        console.log('   ✅ Calendar successfully added to Service Account list.');
        console.log(`   ✅ Connection Successful! Connected to calendar: ${CALENDAR_ID}`);
        calendar = tempCalendar;
      } catch (insertErr) {
        console.error(`\n❌ ERROR: Could not access calendar "${CALENDAR_ID}"`);
        console.error(`   Google Error: ${insertErr.message}`);
        console.error(`   ACTION REQUIRED: Ensure "${serviceAccountEmail}" has "Make changes to events" permission on the calendar.`);
        calendar = null;
      }
    }

  } catch (error) {
    console.error('❌ Failed to authenticate with Google:', error.message);
    calendar = null;
  }
};

initCalendar();

// --- ROUTES ---

/**
 * RETELL AI: CREATE WEB CALL
 * Proxies the request to Retell to get an access token
 */
app.post('/api/retell/create-web-call', async (req, res) => {
  if (!RETELL_API_KEY || !RETELL_AGENT_ID) {
    return res.status(500).json({ error: 'Retell API Key or Agent ID missing in server configuration.' });
  }

  try {
    const response = await axios.post(
      'https://api.retellai.com/v2/create-web-call',
      {
        agent_id: RETELL_AGENT_ID,
      },
      {
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error creating web call:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create web call', details: error.response?.data });
  }
});

/**
 * AVAILABILITY & BOOKING
 */
app.post('/api/availability', async (req, res) => {
  const { date } = req.body;
  const startHour = 9;
  const endHour = 18;
  const selectedDate = new Date(date);

  if (!calendar) {
    const slots = [];
    for (let i = startHour; i < endHour; i++) {
      const hour = i % 12 || 12;
      const suffix = i < 12 ? 'AM' : 'PM';
      slots.push(`${hour}:00 ${suffix}`);
    }
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return res.json({ slots });
  }

  try {
    const timeMin = new Date(selectedDate);
    timeMin.setHours(startHour, 0, 0, 0);
    const timeMax = new Date(selectedDate);
    timeMax.setHours(endHour, 0, 0, 0);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busySlots = response.data.calendars[CALENDAR_ID].busy;
    const availableSlots = [];
    for (let i = startHour; i < endHour; i++) {
      const slotStart = new Date(selectedDate);
      slotStart.setHours(i, 0, 0, 0);
      const slotEnd = new Date(selectedDate);
      slotEnd.setHours(i + 1, 0, 0, 0);

      const isBusy = busySlots.some(busy => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return (slotStart < busyEnd && slotEnd > busyStart);
      });

      if (!isBusy) {
        const hour = i % 12 || 12;
        const suffix = i < 12 ? 'AM' : 'PM';
        availableSlots.push(`${hour}:00 ${suffix}`);
      }
    }
    res.json({ slots: availableSlots });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

app.post('/api/book', async (req, res) => {
  const { name, email, businessName, industry, phone, date, time, type } = req.body;
  let eventId = null;

  // Determine Event Title and Webhook based on Type
  let eventPrefix = 'Demo';
  let targetWebhook = N8N_WEBHOOK_URL;

  if (type === 'website') {
      eventPrefix = 'Website';
      targetWebhook = N8N_WEBSITE_WEBHOOK_URL || N8N_WEBHOOK_URL; // Fallback if 2nd not set
  } else if (type === 'receptionist') {
      eventPrefix = 'Receptionist';
      targetWebhook = N8N_WEBHOOK_URL;
  }

  try {
    if (calendar) {
      const [timeStr, period] = time.split(' ');
      let [hours, minutes] = timeStr.split(':');
      hours = parseInt(hours);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      const startTime = new Date(date);
      startTime.setHours(hours, 0, 0, 0);
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      // Create Event
      const baseEvent = {
        summary: `${eventPrefix}: ${name} (${businessName})`,
        description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nBusiness: ${businessName}\nIndustry: ${industry}\nType: ${type}\n\nBooked via Luno Website.`,
        start: { dateTime: startTime.toISOString() },
        end: { dateTime: endTime.toISOString() },
      };

      // Insert event
      const eventResponse = await calendar.events.insert({
          calendarId: CALENDAR_ID,
          requestBody: baseEvent,
      });
      
      eventId = eventResponse.data.id;
      console.log(`✅ Calendar Event Created. ID: ${eventId}`);
    }

    if (targetWebhook && targetWebhook.startsWith('http')) {
        console.log(`Sending data to n8n (${type || 'default'})...`);
        try {
          await axios.post(targetWebhook, {
              name, email, phone, businessName, industry, type,
              dateString: new Date(date).toDateString(),
              timeString: time,
              timestamp: new Date().toISOString(),
              eventId: eventId // Pass the Google Calendar Event ID to n8n
          });
          console.log(`✅ Data sent to n8n`);
        } catch (n8nErr) {
           console.error(`⚠️ Failed to send to n8n: ${n8nErr.message}`);
        }
    }

    res.json({ success: true });

  } catch (error) {
    console.error('❌ Error creating booking:', error.message);
    // Fallback: If everything fails, still return true to frontend
    res.json({ success: true }); 
  }
});

// --- SERVE VITE FRONTEND ---
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// Handle Port conflicts gracefully
const server = app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: Port ${PORT} is already in use.`);
    console.error(`   Please close other terminal windows running the server.`);
    console.error(`   Or find the process using port ${PORT} and kill it.\n`);
    process.exit(1);
  }
});
