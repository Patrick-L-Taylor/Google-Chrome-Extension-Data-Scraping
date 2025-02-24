// content-script.js

/**
 * Listens for messages from popup.js, extracts data based on the specified selectors,
 * and sends the data back to the sender (popup.js).
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_DATA') {
    try {
      // Replace these with actual selectors for your target page
      const datapoint1Elem = document.querySelector('SOME_SELECTOR_1');
      const datapoint2Elem = document.querySelector('SOME_SELECTOR_2');
      const datapoint3 = window.location.href; // Example: capturing current URL
      const datapoint4Elem = document.querySelector('SOME_SELECTOR_3');

      // Construct the data object from available elements
      const data = {
        datapoint1: datapoint1Elem ? datapoint1Elem.innerText.trim() : '',
        datapoint2: datapoint2Elem ? datapoint2Elem.innerText.trim() : '',
        datapoint3: datapoint3,
        datapoint4: datapoint4Elem ? datapoint4Elem.innerText.trim() : ''
      };

      sendResponse({ success: true, data });
    } catch (error) {
      console.error('Error in content script:', error);
      sendResponse({ success: false, error: error.toString() });
    }
    return true; // Indicates we will respond asynchronously
  }
});
