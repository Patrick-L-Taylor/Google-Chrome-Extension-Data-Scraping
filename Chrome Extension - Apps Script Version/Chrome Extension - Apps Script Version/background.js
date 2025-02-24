// background.js

// This listener will fire once when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(() => {
  console.log('Data Scraping Extension - Apps Script Version installed.');
});
