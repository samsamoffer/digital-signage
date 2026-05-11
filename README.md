# Digital Signage TV App

Displays rotating posters from Google Drive and a scrolling donors list from Google Sheets.

## Setup

1. **Create Google Drive Folder**:
   - Create a folder in Google Drive for posters.
   - Share it publicly: Right-click > Share > "Anyone with the link can view".
   - Copy the folder ID from the URL (after `/folders/`).

2. **Create Google Sheet for Donors**:
   - Create a Google Sheet with donors' names in column A (starting from row 2).
   - Publish: File > Share > Publish to web > CSV.
   - Copy the sheet ID from the published URL.

3. **Deploy Google Apps Script**:
   - Go to https://script.google.com
   - Create new project, paste `code.gs` content.
   - Replace `YOUR_GOOGLE_DRIVE_FOLDER_ID` with your folder ID.
   - Deploy as web app: Deploy > New deployment > Web app > Execute as Me, Access: Anyone.
   - Copy the deployment URL.

4. **Update config.js**:
   - Replace `YOUR_POSTER_SCRIPT_DEPLOYMENT_ID` with the script deployment ID.
   - Replace `YOUR_SHEET_ID` with the sheet ID.

5. **Deploy to GitHub Pages**:
   - Push this repo to GitHub.
   - Enable GitHub Pages in repo settings.

## Features
- Posters rotate every 10 seconds.
- Data refreshes every 1 minute.
- Donors list scrolls continuously at the bottom.