# README (Apps Script Version)

## Overview
This Chrome Extension scrapes data from a target webpage and sends it to a Google Sheet via a Google Apps Script Web App. Use it to automate data collection for your personal or business needs.

## How It Works
1. **User clicks** the “Capture Data” button in the extension’s popup.  
2. The **content script** scrapes data from the currently active webpage using CSS selectors you provide.  
3. The data is **sent** to your Google Apps Script endpoint.  
4. The Google Apps Script **appends** the data as a new row in your chosen Google Sheet.

## Requirements
- A **Google Sheet** where your data will be stored.  
- A **Google Apps Script** file attached to that sheet or a standalone script that can write to a sheet.  
- A **deployed Web App URL** from your Apps Script with permissions set properly (e.g., “Anyone with the link can access”).

## Setup Instructions

1. **Clone or download** this repository.

2. **Open the `manifest.json` file**:
   - Update the `matches` key under `content_scripts` to match the domain you are scraping. For example:
     ```json
     "matches": ["*://**example.com/*"]
     ```

3. **Update the CSS Selectors in `content-script.js`**:
   - Replace `<YOUR_SELECTOR_1>`, `<YOUR_SELECTOR_2>`, etc., with actual selectors that match the webpage elements you want to scrape.
   - You can test these selectors in your browser’s DevTools console before finalizing them.

4. **Update the Web App URL in `popup.js`**:
   - Find the line:
     ```js
     const webAppUrl = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
     ```
   - Replace `"YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"` with the **deployment URL** from your Apps Script (e.g., `https://script.google.com/macros/s/ABC123/exec`).

5. **Set up the Google Apps Script**:
   1. Open or create a Google Apps Script project ([script.google.com](https://script.google.com)) bound to your target Google Sheet (or a standalone project with the correct sheet ID).
   2. Copy and paste the content from `google_sheets_app_script.gs` into your Apps Script editor.
   3. Deploy the script as a **Web App** (under **Deploy** > **New Deployment**):
      - **Who has access**: Choose “Anyone” or “Anyone with the link,” depending on your security needs.
      - **Web app URL**: Copy this URL and paste it in `popup.js`.

6. **Load the Extension in Chrome**:
   1. Go to `chrome://extensions` in your Chrome browser.
   2. Toggle **Developer mode** (top right).
   3. Click **“Load unpacked”**.
   4. Select the folder containing these files (the folder with `manifest.json`).
   5. The extension should now appear in your list of installed extensions.

7. **Test the Extension**:
   1. Navigate to a page that matches your domain filter (e.g., `example.com`).
   2. Click the extension icon, then the **Capture Data** button.
   3. Check your Google Sheet to see if a new row has been appended with the scraped data.

## Customizing

- **Data Fields**: Modify the keys (`datapoint1`, `datapoint2`, etc.) to better reflect the data you’re capturing, both in `content-script.js` and the Apps Script.  
- **Sheet Columns**: You can reorder or format how data is appended in the row within the `appendRow` function in `google_sheets_app_script.gs`.  
- **Styling**: Customize `popup.html` and the extension icons (`icon.png`) to suit your branding.

## Troubleshooting

- **No data is scraped**: Ensure your CSS selectors are correct. Right-click the element in Chrome and choose “Inspect” to confirm the correct selector.  
- **Permission errors**: Check the sharing settings for your Google Apps Script Web App. It must allow POST requests from anyone (or at least anyone with the link).  
- **Console errors**: Open the browser console (F12 in Chrome) to see if there are any script errors. The console in the popup and the background script can be found by right-clicking the extension icon > “Inspect popup” or by going to `chrome://extensions` and clicking **“service worker”** under your extension.
