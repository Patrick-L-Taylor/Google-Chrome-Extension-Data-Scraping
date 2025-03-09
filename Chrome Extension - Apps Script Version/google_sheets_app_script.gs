/**
 * Google Apps Script to append data to the first sheet
 * when receiving an HTTP POST request.
 */

// A basic GET endpoint to ensure the script is alive
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const SECRET_TOKEN = "YOUR_SECRET_TOKEN_VALUE";
  if (!e.parameter.secret || e.parameter.secret !== SECRET_TOKEN) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized"
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // Log the parameters for debugging
    console.log('Received POST request parameters:', e.parameter);

    // Gather data from form fields
    const data = {
      datapoint1: e.parameter.datapoint1 || '',
      datapoint2: e.parameter.datapoint2 || '',
      datapoint3: e.parameter.datapoint3 || '',
      datapoint4: e.parameter.datapoint4 || ''
    };

    // Open the current spreadsheet and get the first sheet
    // (Ensure this Apps Script is bound to the correct Google Sheet)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];

    // Append data as a new row
    sheet.appendRow([
      data.datapoint1,
      data.datapoint2,
      data.datapoint3,
      data.datapoint4
    ]);

    console.log('Data appended to sheet:', data);

    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('Error processing POST request:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error",
        message: err.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
