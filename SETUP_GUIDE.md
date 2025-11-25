
# Luno Studios Setup Guide

## Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Project**:
    ```bash
    npm run dev
    ```
    This starts both the website (`localhost:5173`) and the server (`localhost:5000`).

## Backend Setup (Google Calendar)

1.  **Rename Template**:
    *   Go to `server/` folder.
    *   Rename `env_template.txt` to `.env`.

2.  **Google Service Account**:
    *   You should have a `service_account.json` file in your `server/` folder (from your Google Cloud Console).
    *   Open this file and copy the `client_email`.
    *   Go to your Google Calendar -> Settings -> Share with specific people.
    *   Add that email and give it **"Make changes to events"** permission.

3.  **Configure .env**:
    *   **GOOGLE_CALENDAR_ID**: Put your email address here (e.g. `yourname@gmail.com`).
    *   **RETELL_API_KEY**: Get from Retell AI dashboard.
    *   **RETELL_AGENT_ID**: Get from Retell AI dashboard.
