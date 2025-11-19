# Harvest Helper - Notion Integration

Embed Harvest's time tracking widget directly into your Notion pages.

## Features

- ✅ **Embed Harvest timer** directly in Notion pages
- ✅ **Automatic page linking** - Notion page URL passed to Harvest
- ✅ **No authentication setup** - Harvest handles login/auth
- ✅ **Clean integration** - Uses Harvest's official hosted widget

## Quick Setup

### 1. Host These Files

Upload the `index.html` file to any web server (GitHub Pages, Netlify, etc.) with HTTPS.

### 2. Add to Notion

1. In your Notion page, type `/embed` or click the `+` button
2. Select "Embed" from the menu
3. Enter your hosted `index.html` URL
4. The Harvest timer widget will appear in your page!

## How It Works

The embed loads Harvest's official timer widget and automatically:
- Links to your Notion page URL
- Uses the page title as the time entry description
- Provides full Harvest timer functionality

## URL Parameters

You can customize the embed with URL parameters:

```
https://your-domain.com/index.html?
  app_name=Notion
  &permalink=https://notion.so/your-page
  &item_name=Page Title
  &item_id=page-id
```

## File Structure

```
harvest-notion-addon/
├── index.html    # Embeddable Harvest widget
└── README.md     # This file
```

## Why This Approach?

Since Harvest provides a hosted widget, we simply:
- ✅ Embed it in Notion via iframe
- ✅ Pass Notion page context to Harvest
- ✅ Let Harvest handle everything else

---

**That's it!** A minimal approach that leverages Harvest's existing infrastructure while seamlessly integrating with Notion.
