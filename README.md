# Real Estate Data Scraping Chrome Extension

## Overview
This repository contains two versions of a Chrome Extension designed to scrape real estate data from websites and store it in Google Sheets. **Note: This is an example implementation. Always ensure compliance with website terms of service and data scraping policies before deploying any scraping solution.**

Example use case: Collecting property listings data such as:
- Property address
- Price
- Square footage
- Number of bedrooms/bathrooms
- Listing date
- Agent contact information

## Example Data Structure
This example implementation collects real estate data in the following format:

javascript
{
address: "123 Main St, Anytown, USA",
price: "$450,000",
squareFeet: "2,500",
bedrooms: "4",
bathrooms: "2.5",
listingDate: "2024-03-20",
agentName: "Jane Smith",
agentPhone: "(555) 123-4567"
}

## Repository Structure
├── README.md (this file)
├── Apps-Script-Version/
│ └── ... (complete implementation using Google Apps Script)
└── OAuth-Version/
└── ... (complete implementation using OAuth 2.0)

## Version Comparison

### Apps Script Version
This version uses Google Apps Script as a middleware to handle the connection between your Chrome Extension and Google Sheets.

**Pros:**
- Simpler setup for individual users
- No need to manage OAuth tokens
- Lower maintenance overhead
- Perfect for personal use or small teams
- No Google Cloud Project required

**Cons:**
- Limited by Apps Script quotas and timeouts
- Less scalable for large organizations
- Requires manual deployment of Apps Script
- Less secure for enterprise applications
- Cannot handle high-frequency requests

### OAuth Version
This version implements direct OAuth 2.0 authentication between the Chrome Extension and Google Sheets API.

**Pros:**
- More scalable for larger organizations
- Better performance (direct API access)
- More professional implementation
- Better security controls
- Higher API quotas available
- Suitable for enterprise deployment

**Cons:**
- More complex initial setup
- Requires Google Cloud Project
- Need to manage OAuth credentials
- Higher maintenance overhead
- May require periodic token refresh handling

## Choosing the Right Version

### Choose the Apps Script Version if:
- You're an individual user or small team
- You need quick deployment
- You're scraping data occasionally
- You don't need enterprise-level security
- You want minimal setup complexity

### Choose the OAuth Version if:
- You're deploying across an organization
- You need higher performance
- You're scraping data frequently
- You require enterprise-level security
- You need higher API quotas

## Installation Guide

### Download and Setup

1. **Download the Extension**
   - Click the green "Code" button above
   - Select "Download ZIP"
   - Extract the ZIP file to your preferred location
   - Choose either the `Apps-Script-Version` or `OAuth-Version` folder based on your needs

2. **Install in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top-right corner
   - Click "Load unpacked"
   - Select the folder containing your chosen version
   - The extension icon should appear in your Chrome toolbar

### Post-Installation Setup

#### For Apps Script Version:
1. Create your Google Sheet
2. Set up the Apps Script backend (detailed in version-specific README)
3. Configure the extension with your Sheet's information
4. You're ready to start scraping!

#### For OAuth Version:
1. Set up your Google Cloud Project
2. Configure OAuth credentials
3. Create your Google Sheet
4. Complete the authentication flow when first using the extension
5. Begin scraping data

### Updating the Extension
When new versions are released:
1. Download the latest version
2. Remove the existing extension from Chrome
3. Load the new version following the installation steps above

### Common Installation Issues

**Extension Not Loading:**
- Ensure all files are properly extracted
- Check that Developer mode is enabled
- Verify you selected the correct folder during "Load unpacked"

**Permissions Issues:**
- Accept all required permissions during installation
- For OAuth version, ensure you complete the Google authentication flow
- For Apps Script version, verify your Apps Script deployment settings

## Security Considerations

- The Apps Script version uses a simple secret token for authentication, which while easier to set up, may not be as secure as OAuth.
- The OAuth version requires proper credential management but offers better security through Google's authentication system.
- Both versions should use HTTPS for data transmission.
- Consider data privacy regulations when storing scraped data in Google Sheets.

## Rate Limiting and Performance

### Apps Script Version
- Subject to Google Apps Script quotas:
  - 30 seconds execution time limit
  - 20,000 calls per day (free tier)
  - Limited concurrent executions

### OAuth Version
- Higher quotas available through Google Sheets API
- Better handling of concurrent requests
- No execution time limits
- Requires monitoring of API usage

## Cost Considerations

### Apps Script Version
- Free for most use cases
- No Google Cloud Project required
- Limited by free tier quotas

### OAuth Version
- May incur costs if exceeding free tier
- Google Cloud Project may have associated costs
- Higher quotas available through paid tiers

## Data Management Best Practices

### Backup Considerations
- Regularly backup your Google Sheet data
- Consider enabling Google Sheets version history
- For large datasets, implement periodic exports
- Document your selector patterns for future maintenance

### Error Recovery
- Both versions include basic error logging
- Set up email notifications for Apps Script errors
- Implement retry logic for failed requests
- Consider implementing a backup storage solution

## Browser Compatibility

### Chrome Version Requirements
- Minimum Chrome version: 88+ (for manifest v3)
- Tested on Chrome Desktop (Windows, macOS, Linux)
- Not compatible with mobile Chrome
- May work on Chromium-based browsers (Edge, Brave, etc.)

### Extension Permissions
- Required permissions must be accepted during installation
- Some features may require additional permissions
- Privacy implications of each permission should be reviewed

## Legal Considerations
- Always review and comply with website terms of service
- Respect robots.txt and rate limiting
- Ensure compliance with data protection regulations
- Obtain necessary permissions for data collection
- Consider privacy implications of stored data

## Contributing
Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License
[Your chosen license]
