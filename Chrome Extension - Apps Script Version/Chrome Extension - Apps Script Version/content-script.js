/**
 * content-script.js
 *
 * This script runs in the context of the target webpage.
 * It listens for messages from the popup or background script
 * and responds by scraping data from the page.
 */

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the incoming message requests data
  if (request.action === 'GET_DATA') {
    try {
      // Replace these selectors with the specific DOM elements 
      // you want to scrape from your target site.
      const datapoint1Elem = document.querySelector('<YOUR_SELECTOR_1>');
      const datapoint2Elem = document.querySelector('<YOUR_SELECTOR_2>');
      const datapoint3Elem = document.querySelector('<YOUR_SELECTOR_3>');

      // Log to help with debugging
      console.log('Datapoint 1 element:', datapoint1Elem);
      console.log('Datapoint 2 element:', datapoint2Elem);
      console.log('Datapoint 3 element:', datapoint3Elem);

      // Build a data object with the scraped text 
      // (modify keys/values to suit your needs)
      const data = {
        datapoint4: window.location.href,
        datapoint1: datapoint1Elem ? datapoint1Elem.innerText.trim() : '',
        datapoint2: datapoint2Elem ? datapoint2Elem.innerText.trim() : '',
        datapoint3: datapoint3Elem ? datapoint3Elem.innerText.trim() : ''
      };

      // Respond with success and the collected data
      sendResponse({ success: true, data });
    } catch (error) {
      console.error('Error in content script:', error);
      sendResponse({ success: false, error: error.toString() });
    }
    // Return true to indicate an async response
    return true;
  }
});
