/**
 * popup.js
 *
 * Handles the button click in popup.html, 
 * sends a message to the content script to scrape data,
 * and then sends that data to the Google Apps Script Web App.
 */

document.addEventListener('DOMContentLoaded', () => {
  const captureBtn = document.getElementById('capture-btn');

  captureBtn.addEventListener('click', async () => {
    try {
      // Get the currently active browser tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Send a message to the content script to scrape data
      chrome.tabs.sendMessage(tab.id, { action: 'GET_DATA' }, async (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message to content script:', chrome.runtime.lastError.message);
          return;
        }

        if (response && response.success) {
          const data = response.data;
          console.log('Data from content script:', data);

          // TODO: Replace this URL with your deployed Apps Script Web App URL
          const webAppUrl = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

          // Prepare form data for sending to the Apps Script
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
          });

          try {
            // POST data to your Apps Script Web App endpoint
            const fetchResponse = await fetch(webAppUrl, {
              method: 'POST',
              body: formData
            });

            if (!fetchResponse.ok) {
              const errorText = await fetchResponse.text();
              console.error('Network response was not ok:', fetchResponse.status, fetchResponse.statusText, errorText);
              alert('Error sending data to Google Sheets. Check console for details.');
              return;
            }

            // Handle the JSON response from the Apps Script
            const result = await fetchResponse.json();
            console.log('Result from Apps Script:', result);

            if (result.status === 'success') {
              alert('Data saved successfully!');
            } else {
              console.error('Error in Apps Script response:', result.message);
              alert(`Error saving data: ${result.message || 'Unknown error'}`);
            }
          } catch (err) {
            console.error('Error sending data to Apps Script:', err);
            alert('Error sending data to Google Sheets. Check console for details.');
          }
        } else {
          console.error('No valid response from content script.', response);
          alert('Failed to retrieve data.');
        }
      });
    } catch (err) {
      console.error('Error in captureBtn click handler:', err);
    }
  });
});
