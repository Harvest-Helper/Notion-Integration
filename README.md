# Harvest Helper - Notion Integration

Add a "Track Time" button to your Notion pages that opens Harvest's time tracking widget, similar to the Trello Power-Up.

## Features

- ✅ **Button-style integration** - Clean button that opens Harvest widget
- ✅ **Automatic page linking** - Notion page URL and title passed to Harvest
- ✅ **No authentication setup** - Harvest handles login/auth
- ✅ **Cross-platform** - Works on Notion web; desktop compatibility varies (see [COMPATIBILITY.md](COMPATIBILITY.md))
- ✅ **Multiple options** - Modal popup or new window versions available

## Quick Setup

### 1. Host These Files

Upload the files to any web server (GitHub Pages, Netlify, Vercel, etc.) with HTTPS.

### 2. Add to Notion

**Option A: Simple Button (Recommended - Best Compatibility)**
1. In your Notion page, type `/embed` or click the `+` button
2. Select "Embed" from the menu
3. Enter your hosted `button-simple.html` URL
4. A "Track Time" button will appear - click it to open the Harvest widget in a new window!
5. **Best for**: Maximum compatibility on both web and desktop

**Option B: Button with Modal**
1. Same as above, but use `button.html` instead
2. Opens Harvest widget in a modal overlay
3. **Note**: May have issues on Notion desktop app (see [COMPATIBILITY.md](COMPATIBILITY.md))

**Option C: Full Widget Embed (Original)**
1. Use `index.html` to embed the full Harvest widget directly in the page

## How It Works

When you click the "Track Time" button:
1. Opens Harvest's timer widget in a modal popup (or new window)
2. **Page URL** → Reference link in Harvest
3. **Page title** → Time entry description
4. **Page ID** → External item ID for tracking
5. User can start timer, log time, and close the modal

## URL Parameters

You can customize the button with URL parameters:

```
https://your-domain.com/button.html?
  page_url=https://notion.so/your-page
  &page_title=Page Title
  &page_id=page-id
```

If parameters aren't provided, it will try to detect them from the page context.

## File Structure

```
harvest-notion/
├── button.html         # Button with modal popup
├── button-simple.html  # Simple button (opens in new window) - RECOMMENDED
├── index.html          # Full widget embed (original)
├── README.md           # This file
└── COMPATIBILITY.md    # Web vs Desktop compatibility guide
```

## Comparison with Trello Power-Up

This Notion integration mirrors the Trello Power-Up approach:

| Feature | Trello Power-Up | Notion Integration |
|---------|----------------|-------------------|
| Button placement | Card detail badges | Embed block |
| Widget opening | Modal via Trello API | Modal via JavaScript |
| Page context | Card name/URL/ID | Page title/URL/ID |
| Authentication | Harvest widget | Harvest widget |

**Key Difference:** Notion doesn't have a Power-Up system, so we use embed blocks instead of native buttons. The functionality is identical!

## Why This Approach?

Since Harvest provides a hosted widget, we simply:
- ✅ Add a button-style embed in Notion
- ✅ Open Harvest's widget in a modal when clicked
- ✅ Pass Notion page context to Harvest
- ✅ Let Harvest handle everything else

---

**That's it!** A minimal approach that leverages Harvest's existing infrastructure while seamlessly integrating with Notion, just like the Trello Power-Up.
