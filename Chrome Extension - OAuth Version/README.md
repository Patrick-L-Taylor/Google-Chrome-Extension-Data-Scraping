# Google Sheets Data Scraping Extension (OAuth Version)

## Overview
This Chrome Extension scrapes data from target webpages and sends it directly to Google Sheets via the **Google Sheets API** with **OAuth 2.0** authentication. Perfect for automated data collection that requires enterprise-level security and scalability.

## Requirements
- A **Google Cloud Project** with the Google Sheets API enabled
- An **OAuth 2.0 Client ID** (Web application type)
- A **Google Sheet** to store your data
- Chrome browser with Developer mode enabled
- Basic familiarity with Chrome Extensions and Google Cloud Console

## How It Works
1. User clicks the extension's "Capture Data" button
2. Content script scrapes webpage data using configured CSS selectors
3. Extension requests OAuth authorization via `chrome.identity.launchWebAuthFlow`
4. With valid OAuth token, data is sent directly to Google Sheets API

## Setup Instructions

### 1. Google Cloud Project Setup
1. Open the [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable the **Google Sheets API** under "APIs & Services"
4. Configure the OAuth consent screen:
   - Set application name
   - Add necessary scopes
   - Add test users if needed

### 2. OAuth Configuration
1. In Google Cloud Console, go to "Credentials"
2. Create an **OAuth 2.0 Client ID** (Web application type)
3. Add authorized redirect URI:
   ```
   https://<YOUR_EXTENSION_ID>.chromiumapp.org/
   ```
   Note: You'll get your extension ID after loading it in Chrome

### 3. Extension Installation
1. Update `manifest.json`:
   ```json
   "matches": ["*://example.com/*"]
   ```
   Replace with your target domain(s)

2. Configure `popup.js`:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```

3. Update CSS selectors in `content-script.js`:
   ```javascript
   // Replace with your actual selectors
   const selectors = {
     datapoint1: '.your-selector-1',
     datapoint2: '.your-selector-2'
   };
   ```

4. Load in Chrome:
   - Navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension folder

### 4. Testing
1. Visit a webpage matching your domain filter
2. Click the extension icon
3. Press "Capture Data"
4. Complete OAuth authorization (first time only)
5. Verify data appears in your Google Sheet

## Customizing

### Data Fields
- Modify selectors in `content-script.js`
- Update data processing logic
- Add new fields as needed

### Sheet Columns
- Adjust column order in `popup.js`
- Modify data formatting
- Add data validation if needed

### Styling
- Customize `popup.html`
- Update extension icon
- Modify CSS styles

## Troubleshooting

### OAuth Issues
- **Invalid Redirect URI**: Verify the URI exactly matches:
  ```
  https://<YOUR_EXTENSION_ID>.chromiumapp.org/
  ```
- **Authorization Failed**: Check OAuth consent screen configuration
- **Token Expired**: Extension will automatically refresh tokens

### Data Scraping Issues
- **No Data Found**: Verify selectors in DevTools console:
  ```javascript
  document.querySelector('your-selector')
  ```
- **Wrong Data**: Check selector specificity
- **Dynamic Content**: Add appropriate delays

### API Issues
- **Quota Exceeded**: Check Google Cloud Console quotas
- **Permission Denied**: Verify API is enabled
- **Invalid Request**: Check spreadsheet ID and range

### Permission Issues
Required scope: https://www.googleapis.com/auth/spreadsheets



