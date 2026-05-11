# AI Agent Guidance for Digital Signage

## Project Overview
Static web app for digital signage: rotating posters from Google Drive, scrolling donors list from Google Sheets.

## Key Files
- `index.html`: Main page structure.
- `app.js`: Fetches and rotates posters, loads and scrolls donors.
- `config.js`: Holds API URLs and intervals.
- `style.css`: Layout and scrolling animation.
- `code.gs`: Google Apps Script for poster metadata.

## Deployment
- Posters: Upload to public Google Drive folder, script fetches metadata.
- Donors: Google Sheet published as CSV.
- GitHub Pages serves the static site.

## Notes
- Ensure Drive folder and files are public.
- Update config.js with actual IDs after setup.
- App auto-refreshes data every minute.