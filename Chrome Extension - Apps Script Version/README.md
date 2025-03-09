# Data Scraping Chrome Extension (Apps Script Version)

## Overview
This Chrome Extension allows you to scrape webpage data and automatically save it to Google Sheets using Google Apps Script. This version is perfect for individual users or small teams needing quick deployment with minimal setup complexity.

## Requirements
- A **Google Sheet** where your data will be stored
- A **Google Account** with permission to create Apps Scripts
- Chrome browser with Developer mode enabled
- Basic familiarity with Chrome Extensions

## How It Works
1. User clicks the extension's "Capture Data" button
2. Content script scrapes webpage data using configured CSS selectors
3. Data is sent to your Google Apps Script Web App endpoint
4. Apps Script appends the data as a new row in your Google Sheet

## Setup Instructions

### 1. Google Sheets Setup
1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Add headers to your first row (A1, B1, C1, D1) matching your data points:
   - Example: "Title" | "Price" | "Rating" | "URL"

### 2. Apps Script Setup
1. In your Google Sheet, click `Extensions` > `Apps Script`
2. Delete any code in the editor
3. Copy and paste the content from `google_sheets_app_script.gs`
4. Modify the `SECRET_TOKEN`:
   ```javascript
   const SECRET_TOKEN = "create-your-own-secret-string-here";
   ```
   - Create a unique, secure string (e.g., "my-secure-token-12345")
   - Save this token for later use

5. Deploy the Web App:
   1. Click `Deploy` > `New deployment`
   2. Click `Select type` > `Web app`
   3. Configure:
      - Description: "Data Scraping Web App"
      - Execute as: "Me"
      - Who has access: "Anyone"
   4. Click `Deploy`
   5. Click `Authorize access`
   6. In the security prompt:
      - Click `Advanced` > `Go to [Project Name] (unsafe)`
      - Click `Allow`
   7. **Copy the Web App URL** for later use

### 3. Extension Setup
1. Configure `manifest.json`:
   ```json
   "matches": ["*://*.yourwebsite.com/*"]
   ```
   Replace with your target domain(s)

2. Configure `content-script.js`:
   ```javascript
   // Replace with your actual selectors
   const selectors = {
     datapoint1: '.your-selector-1',
     datapoint2: '.your-selector-2'
   };
   ```

3. Configure `popup.js`:
   ```javascript
   const webAppUrl = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
   const SECRET_TOKEN = "YOUR_SECRET_TOKEN_VALUE";
   ```

### 4. Testing
1. Visit a webpage matching your domain filter
2. Click the extension icon
3. Press "Capture Data"
4. Verify data appears in your Google Sheet

## Customizing

### Data Fields
- Modify selectors in `content-script.js`
- Update data processing logic
- Add new fields as needed

### Sheet Columns
- Adjust column order in `google_sheets_app_script.gs`
- Modify data formatting
- Add data validation if needed

### Styling
- Customize `popup.html`
- Update extension icon
- Modify CSS styles

## Extension Configuration

### manifest.json Examples
json
// Single domain
"matches": ["://.example.com/"]
// Multiple domains
"matches": ["://.site1.com/", "://.site2.com/"]
// All sites (use with caution)
"matches": ["<all_urls>"]

### Testing Selectors

javascript
// In browser console:
document.querySelector('.your-selector')
document.querySelectorAll('.your-selector')


## Troubleshooting

### Selector Issues
1. **Element Not Found**
   - Verify selector in DevTools console
   - Check for dynamic content loading
   - Try more specific selectors
   ```javascript
   // Example of more specific selector
   document.querySelector('.parent-class .specific-class')
   ```

2. **Dynamic Content**
   ```javascript
   // Add delay for dynamic content
   setTimeout(() => {
     const element = document.querySelector('.selector');
   }, 1000);
   ```

### Apps Script Issues
1. **"Unauthorized" Error**
   - Verify SECRET_TOKEN matches in both files
   - Check Web App deployment settings
   - Ensure "Execute as: Me" is selected

2. **"Failed to fetch" Error**
   - Verify Web App URL is correct
   - Check if script is properly deployed
   - Confirm Apps Script is not hitting quota limits

3. **Data Not Appearing**
   - Check Apps Script execution logs
   - Verify sheet name and range
   - Confirm data format matches expectations

### Common Extension Issues
- Enable Developer Mode in Chrome
- Check browser console for errors (F12)
- Verify manifest.json permissions
- Confirm content script is injecting properly

## Support
1. Check browser console (F12)
2. Review Apps Script execution logs
3. Verify all tokens and URLs match
4. Test selectors individually
5. Examine network requests in DevTools