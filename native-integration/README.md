# Harvest Notion Native Integration

A native Notion API integration that adds Harvest timer buttons to Notion pages. Works on both **web and desktop** Notion apps.

## How It Works

1. **User installs the integration** in their Notion workspace
2. **Integration adds button blocks** to pages (via Notion API)
3. **Button opens Harvest widget** with page context
4. **Works everywhere** - web, desktop, and mobile

## Architecture

```
Notion Pages
    ↓
Notion API Integration
    ↓
Backend Service (this repo)
    ↓
Adds Button Blocks to Pages
    ↓
Button Opens Harvest Widget
```

## Setup Instructions

### 1. Create Notion Integration

1. Go to https://www.notion.com/my-integrations
2. Click **"+ New integration"**
3. Name it "Harvest Helper"
4. Select your workspace
5. Set capabilities:
   - ✅ Read content
   - ✅ Insert content
   - ✅ Update content
6. Copy the **Internal Integration Token**

### 2. Create OAuth App (for Public Integration)

If you want to publish this publicly:

1. Go to https://www.notion.com/my-integrations
2. Click **"Create new OAuth integration"**
3. Fill in details:
   - Name: Harvest Helper
   - Logo: (upload icon)
   - Redirect URI: `https://your-domain.com/oauth/notion/callback`
4. Copy **Client ID** and **Client Secret**

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
NOTION_CLIENT_ID=your_client_id
NOTION_CLIENT_SECRET=your_client_secret
NOTION_REDIRECT_URI=http://localhost:3000/oauth/notion/callback
PORT=3000
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Server

```bash
npm start
# or for development
npm run dev
```

## Usage

### Option A: Manual Button Addition

Users can call the API to add a button to a specific page:

```bash
curl -X POST http://localhost:3000/api/add-timer-button \
  -H "Content-Type: application/json" \
  -d '{
    "pageId": "your-page-id",
    "notionToken": "your-notion-token"
  }'
```

### Option B: Automatic Button Addition

Set up webhooks to automatically add buttons to new pages:

1. Configure webhook in Notion integration settings
2. Point to: `https://your-domain.com/webhook/notion`
3. Buttons will be added automatically to new pages

### Option C: Template/Database Approach

Create a Notion template or database that includes the timer button, so users can duplicate it.

## How Users Install

### For Internal Integration

1. User goes to Notion workspace settings
2. Navigates to "Connections"
3. Adds "Harvest Helper" integration
4. Grants access to pages they want to use it on

### For Public Integration (OAuth)

1. User visits your integration page
2. Clicks "Connect to Notion"
3. Authorizes via OAuth
4. Integration is added to their workspace

## Button Behavior

When users click the "⏱ Start Timer" button:

1. Opens Harvest widget in new window/tab
2. Automatically includes:
   - Page URL as reference link
   - Page title as time entry description
   - Page ID for tracking

## Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Railway

1. Connect GitHub repo
2. Set environment variables
3. Deploy

### Option 3: Heroku

```bash
heroku create
git push heroku main
```

## Limitations & Workarounds

### Limitation: Can't Add to Top Bar

**Reality:** Notion API doesn't support adding buttons to the top bar or native UI.

**Solution:** Use button blocks that appear in the page content. These work identically and are visible on all platforms.

### Limitation: Manual Addition Required

**Reality:** Can't automatically inject buttons into all existing pages.

**Solutions:**
1. Use webhooks to auto-add to new pages
2. Create templates with buttons pre-added
3. Provide a "Add Timer Button" action users can trigger

## Next Steps

1. ✅ Basic integration structure
2. ⏳ Add webhook handling for auto-button addition
3. ⏳ Create user-facing UI for button management
4. ⏳ Submit to Notion Integration Gallery
5. ⏳ Add Harvest OAuth for seamless auth

## Files

- `server.js` - Express server with OAuth and webhook handlers
- `notion-service.js` - Notion API interactions
- `harvest-service.js` - Harvest API integration (optional)
- `package.json` - Dependencies

## Resources

- [Notion API Documentation](https://developers.notion.com)
- [Notion Integration Gallery](https://www.notion.com/integrations)
- [Harvest API Documentation](https://help.getharvest.com/api-v2/)

