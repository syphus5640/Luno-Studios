// server/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const app = express();
app.use(express.json());

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || process.env.VITE_API_URL || 'http://localhost:5173';
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || origin === FRONTEND_URL) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};
if ((process.env.NODE_ENV || 'development') === 'production') {
  app.use(cors(corsOptions));
} else {
  app.use(cors({ origin: ['http://localhost:5173', FRONTEND_URL, '*'] }));
}

let googleCreds;
if (process.env.GOOGLE_SERVICE_ACCOUNT) {
  try { googleCreds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT); } catch (e) {}
} else {
  const local = path.join(__dirname, 'service_account.json');
  if (fs.existsSync(local)) googleCreds = JSON.parse(fs.readFileSync(local));
}

let calendar = null;
if (googleCreds) {
  const jwt = new google.auth.JWT(
    googleCreds.client_email,
    null,
    googleCreds.private_key,
    ['https://www.googleapis.com/auth/calendar']
  );
  google.options({ auth: jwt });
  calendar = google.calendar({ version: 'v3', auth: jwt });
}

app.get('/_health', (r, s) => s.json({ ok: true }));

app.get('/api/calendar/list', async (req, res) => {
  try {
    if (!calendar) return res.status(500).json({ error: 'Google not configured' });
    const id = process.env.GOOGLE_CALENDAR_ID;
    const out = await calendar.events.list({
      calendarId: id,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
      timeMin: new Date().toISOString()
    });
    res.json(out.data.items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server on " + PORT));
