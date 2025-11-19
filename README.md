# Harvest Helper - Notion Integration

Add native Harvest timer buttons to your Notion pages that work on **web, desktop, and mobile**. Uses [Harvest's platform.js](https://github.com/harvesthq/platform/blob/main/button.md) for official timer button functionality.

## Features

- ✅ **Native Harvest Buttons** - Uses Harvest's official platform.js (same as their native integrations)
- ✅ **Works Everywhere** - Web, desktop, and mobile Notion apps
- ✅ **Automatic Context** - Notion page URL and title automatically passed to Harvest
- ✅ **Full Timer Functionality** - Start, stop, log time, select projects/tasks
- ✅ **No Authentication Setup** - Harvest handles login/auth in their widget

## Quick Start

### Option 1: Manual Embed (Simple)

1. In your Notion page, type `/embed` or click the `+` button
2. Select "Embed" from the menu
3. Enter this URL:
   ```
   https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=YOUR_PAGE_ID&page_title=Your%20Page%20Title&page_url=https://notion.so/your-page
   ```
4. A native Harvest timer button will appear!

### Option 2: Native Integration (Recommended)

Use the Notion API integration to automatically add buttons to pages:

1. **Deploy the backend service** (see [`native-integration/README.md`](native-integration/README.md))
2. **Create a Notion integration** at https://www.notion.com/my-integrations
3. **Use the API** to add timer buttons to pages
4. Buttons work everywhere! ✅

See [`native-integration/README.md`](native-integration/README.md) for full setup instructions.

## How It Works

1. **Embed Block** loads `harvest-button.html` (hosted on GitHub Pages)
2. **Harvest platform.js** automatically converts the placeholder into an interactive timer button
3. **Button functionality** includes:
   - Start/stop timer
   - Log time entries
   - Select projects and tasks
   - Automatic linking to Notion page

## File Structure

```
harvest-notion/
├── harvest-button.html      # Native Harvest button using platform.js ⭐
├── index.html               # Full widget embed (alternative)
├── README.md                # This file
├── COMPATIBILITY.md         # Platform compatibility details
└── native-integration/       # Backend service for Notion API integration
    ├── server.js            # Express server with OAuth & webhooks
    ├── notion-service.js    # Notion API interactions
    ├── harvest-service.js   # Harvest API integration
    ├── HARVEST_PLATFORM.md  # Platform.js documentation
    └── README.md            # Integration setup guide
```

## URL Parameters

The `harvest-button.html` accepts these URL parameters:

- `page_id` - Notion page ID (required)
- `page_title` - Page title for time entry description
- `page_url` - Full Notion page URL for reference link

Example:
```
https://harvest-helper.github.io/Notion-Integration/harvest-button.html?
  page_id=abc123
  &page_title=My%20Project%20Page
  &page_url=https://notion.so/workspace/abc123
```

## Platform Compatibility

✅ **Web** - Full support  
✅ **Desktop** - Full support (via embed blocks)  
✅ **Mobile** - Full support (via embed blocks)

See [COMPATIBILITY.md](COMPATIBILITY.md) for detailed compatibility information.

## Comparison with Trello Power-Up

This Notion integration provides similar functionality to the Trello Power-Up:

| Feature | Trello Power-Up | Notion Integration |
|---------|----------------|-------------------|
| Button placement | Card detail badges | Embed block |
| Button system | Harvest platform.js | Harvest platform.js |
| Page context | Card name/URL/ID | Page title/URL/ID |
| Platform support | Web only | Web, desktop, mobile |

**Key Advantage:** Works on desktop and mobile, not just web!

## Why This Approach?

- ✅ Uses Harvest's official button system (platform.js)
- ✅ Same buttons used in Harvest's native integrations
- ✅ Works on all Notion platforms (web, desktop, mobile)
- ✅ No browser extension required
- ✅ Leverages Harvest's maintained infrastructure

## Resources

- [Harvest Platform.js Documentation](https://github.com/harvesthq/platform/blob/main/button.md)
- [Notion API Documentation](https://developers.notion.com)
- [Notion Integration Gallery](https://www.notion.com/integrations)

---

**Built with** [Harvest's platform.js](https://github.com/harvesthq/platform) for native timer button functionality.
