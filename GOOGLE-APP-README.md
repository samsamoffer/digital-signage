# Google Apps Script Digital Signage

## Setup Instructions

1. **Create New Google Apps Script Project:**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Name it "Digital Signage"

2. **Copy the Code:**
   - Copy all content from `google-app.gs`
   - Paste it into the script editor (replace the default code)

3. **Update Folder ID (if needed):**
   - In the script, find: `const folderId = '1GPFbx5He4uVQWC64fOeTq4SLSsnxN9Vc';`
   - Replace with your Google Drive folder ID

4. **Update Donors Sheet URL (if needed):**
   - The script already includes your donors sheet URL
   - If you have a different sheet, update the fetch URL in the script

5. **Deploy as Web App:**
   - Click **Deploy** > **New deployment**
   - Select type: **Web app**
   - Execute as: **Me** (your Google account)
   - Access: **Anyone** (so it can be viewed publicly)
   - Click **Deploy**
   - **Copy the deployment URL** - this is your signage URL!

6. **Share Google Drive Folder:**
   - Make sure your poster folder is shared: "Anyone with the link can view"

## Features
- ✅ Auto-rotating posters from Google Drive
- ✅ Scrolling donors list from Google Sheets
- ✅ Responsive design for TVs
- ✅ No external hosting needed
- ✅ Updates automatically every minute

## Usage
Just open the deployment URL in any browser or on your TV. Add/remove images in Drive or update the Sheet - changes appear automatically!