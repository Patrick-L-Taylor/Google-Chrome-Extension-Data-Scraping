// popup.js

/**
 * Replace this with your actual Client ID from the Google Cloud Console
 */
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';

/**
 * The scopes required for reading/writing Google Sheets
 */
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Replace with your Google Sheets ID (the long string in the spreadsheet URL)
 */
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

/**
 * The range in the sheet where data will be appended.
 * Example: "Sheet1!A:D"
 */
const RANGE = 'Sheet1!A:E';

/**
 * Manages OAuth authorization process using chrome.identity.launchWebAuthFlow.
 * @returns {Promise<string>} The OAuth access token.
 */
async function authorize() {
  return new Promise((resolve, reject) => {
    // The redirect URI must match the pattern: https://<extension_id>.chromiumapp.org/
    const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`;

    // Retrieve token info from storage
    chrome.storage.local.get(['accessToken', 'tokenExpiry'], async (result) => {
      // If we have a valid (non-expired) token, reuse it
      if (result.accessToken && result.tokenExpiry && Date.now() < result.tokenExpiry) {
        resolve(result.accessToken);
        return;
      }

      // Build the OAuth URL to request access token
      let authUrl =
        'https://accounts.google.com/o/oauth2/auth' +
        '?response_type=token' +
        `&client_id=${encodeURIComponent(CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(SCOPES.join(' '))}` +
        '&prompt=consent';

      // Launch the OAuth flow
      chrome.identity.launchWebAuthFlow(
        { url: authUrl, interactive: true },
        (redirectResponse) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          if (redirectResponse) {
            // The access token is returned in the URL fragment after the '#'
            const urlFragment = new URL(redirectResponse).hash.substring(1);
            const params = new URLSearchParams(urlFragment);
            const accessToken = params.get('access_token');
            const expiresIn = params.get('expires_in');

            if (accessToken) {
              // Calculate expiry time (in ms)
              const tokenExpiry = Date.now() + parseInt(expiresIn) * 1000;
              // Save token data
              chrome.storage.local.set({
                accessToken: accessToken,
                tokenExpiry: tokenExpiry
              });
              resolve(accessToken);
            } else {
              reject(new Error('No access token found in redirect response'));
            }
          } else {
            reject(new Error('Empty redirect response'));
          }
        }
      );
    });
  });
}

/**
 * Appends the given row data to the specified Google Sheet.
 * @param {string} accessToken - The OAuth access token.
 * @param {Array} rowValues - The row data to append (array of strings).
 */
async function appendDataToSheet(accessToken, rowValues) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED`;
  const body = {
    values: [rowValues]
  };

  // Call the Sheets API
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sheets API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log('Sheets API append result:', result);
  return result;
}

// Execute once the popup DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const captureBtn = document.getElementById('capture-btn');

  captureBtn.addEventListener('click', async () => {
    try {
      // 1. Authorize to get (or refresh) our token
      const token = await authorize();
      console.log('Got an access token:', token);

      // 2. Identify the current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // 3. Inject content script if needed
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content-script.js']
        });
      } catch (e) {
        console.log('Content script already injected or injection failed:', e);
      }

      // 4. Request data from the content script
      chrome.tabs.sendMessage(tab.id, { action: 'GET_DATA' }, async (response) => {
        // If we can't contact the content script
        if (chrome.runtime.lastError) {
          console.error('Message sending failed:', chrome.runtime.lastError);
          alert('Failed to communicate with the page. Make sure you are on the correct page.');
          return;
        }

        // If no response or an error response
        if (!response || !response.success) {
          alert('Failed to retrieve data from content script.');
          return;
        }

        // 5. Append data to Google Sheets
        const data = response.data;
        console.log('Data from content script:', data);

        try {
          await appendDataToSheet(token, [
            data.datapoint1,
            data.datapoint2,
            data.datapoint3,
            data.datapoint4
          ]);
          alert('Data saved successfully to Google Sheets!');
        } catch (error) {
          console.error('Error calling Sheets API:', error);
          alert('Error appending data to sheet: ' + error.message);
        }
      });
    } catch (err) {
      console.error('Error in authorization or fetch:', err);
      alert('Authorization error: ' + err.message);
    }
  });
});
