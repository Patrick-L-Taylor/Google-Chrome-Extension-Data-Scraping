# README (OAuth Version)

## Overview
This Chrome Extension scrapes data from a target webpage and sends it directly to a Google Sheet via the **Google Sheets API** with **OAuth 2.0**. Use it to automate data collection for your personal or business needs.

## How It Works
1. **User clicks** the “Capture Data” button in the extension’s popup.  
2. The **content script** scrapes data from the currently active webpage using CSS selectors you provide.  
3. The extension **requests** OAuth authorization from your Google account (using `chrome.identity.launchWebAuthFlow`).  
4. With a valid OAuth access token, the extension **calls** the Google Sheets API to append the scraped data as a new row in your chosen spreadsheet.

## Requirements
- A **Google Cloud Project** with the **Google Sheets API** enabled.  
- A **Client ID** for OAuth 2.0 (type: **Web application**) that includes a redirect URI in the format: https://<YOUR_EXTENSION_ID>.chromiumapp.org/
- A **Google Sheet** where your data will be stored (copy the **Spreadsheet ID** from its URL).  
- Familiarity with **Chrome Extensions** and the **Google Cloud Console**.

## Setup Instructions

1. **Clone or download** this repository.

2. **Open the `manifest.json` file**:  
 - Update the `"matches"` field under `"content_scripts"` to match the domain you want to scrape. For example:
   ```json
   "matches": ["*://example.com/*"]
   ```
 - Replace `example.com` with the actual site(s) you plan to target.

3. **Update the CSS Selectors in `content-script.js`**:  
 - Replace any placeholders like `<YOUR_SELECTOR_1>` with actual selectors that match the webpage elements you want to scrape.
 - You can test these selectors in your browser’s DevTools console by typing `document.querySelector('<YOUR_SELECTOR_1>')` to ensure they select the correct element.

4. **Configure OAuth in `popup.js`**:
 - Find the line:
   ```js
   const CLIENT_ID = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';
   ```
   Replace it with your actual **OAuth Client ID** from the Google Cloud Console (something like `1234567890-abc123def456.apps.googleusercontent.com`).
 - Next, locate:
   ```js
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
   Replace `'YOUR_SPREADSHEET_ID_HERE'` with your **Google Sheet’s** ID (the long string in the sheet’s URL).
 - Optionally update the `RANGE` variable if needed (e.g., `'Sheet1!A:E'`).

5. **Set up and Verify Your Google Cloud Project**:
 1. Open the [Google Cloud Console](https://console.cloud.google.com).  
 2. Create or select a project and **enable the Google Sheets API** under **APIs & Services**.  
 3. Under **Credentials**, create or edit an **OAuth 2.0 Client ID** (type **Web application**).  
 4. In **Authorized redirect URIs**, add:
    ```
    https://<YOUR_EXTENSION_ID>.chromiumapp.org/
    ```
    where `<YOUR_EXTENSION_ID>` matches the ID assigned by Chrome once you load this extension.

6. **Load the Extension in Chrome**:
 1. Go to `chrome://extensions` in your browser.  
 2. Toggle **Developer mode** (usually top right).  
 3. Click **“Load unpacked”**.  
 4. Select the folder containing the extension files (the folder with `manifest.json`).  
 5. The extension should now appear in your list of installed extensions.

7. **Test the Extension**:
 1. Navigate to a webpage that matches your `manifest.json` domain filter.  
 2. Click the extension’s icon in the Chrome toolbar.  
 3. In the popup, click **Capture Data**.  
 4. The first time you use it, Google will ask you to **authorize** access to the Sheets API.  
 5. After authorization, the extension should append a new row to your Google Sheet with the scraped data.

## Customizing

- **Data Fields**: In `content-script.js`, rename or add keys (e.g., `datapoint1`, `datapoint2`) for different data. In `popup.js`, adjust the array passed to the `appendDataToSheet()` function to match your data structure.  
- **Sheet Columns**: Modify or reorder columns by changing the order of data in the array in `popup.js`.  
- **Styling**: Update `popup.html` and any related CSS to reflect your design. Replace `icon.png` with your own icon to personalize the extension.

## Troubleshooting

- **Invalid Redirect URI**: If you get an error during OAuth, check that your **Authorized redirect URIs** in the Google Cloud Console exactly match: https://<YOUR_EXTENSION_ID>.chromiumapp.org/

(Replace `<YOUR_EXTENSION_ID>` with your actual extension ID.)

- **No Data is Scraped**: Ensure the CSS selectors in `content-script.js` are correct. Use the DevTools console (`document.querySelector(...)`) to verify.  

- **Consent Screen / “Unverified App”**: You may need to configure the **OAuth consent screen** or restrict usage to test users in the Google Cloud Console.  

- **Sheets API Errors**:
- Right-click the extension icon and select **“Inspect popup”** to see console logs for the popup script.  
- Go to `chrome://extensions`, find your extension, and click the **“service worker”** or **“background page”** link to view logs from the background script.

- **Permission Denied**: Confirm that the Google Sheets API is enabled and your OAuth Client ID includes scope: https://www.googleapis.com/auth/spreadsheets

This scope must be requested to append data to Sheets.



