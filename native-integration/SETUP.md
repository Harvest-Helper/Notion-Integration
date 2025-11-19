# Step-by-Step Setup Guide

Follow these steps to get the Notion API integration running.

## Step 1: Create Notion Integration (5 minutes)

1. **Go to Notion Integrations:**
   - Visit: https://www.notion.com/my-integrations
   - Sign in if needed

2. **Create New Integration:**
   - Click **"+ New integration"**
   - Name: `Harvest Helper`
   - Workspace: Select your workspace
   - Type: **Internal** (for now, we can make it public later)

3. **Set Capabilities:**
   - ✅ **Read content** - To read page info
   - ✅ **Insert content** - To add button blocks
   - ✅ **Update content** - To update pages if needed

4. **Copy the Token:**
   - After creating, you'll see an **"Internal Integration Token"**
   - It looks like: `secret_abc123def456...`
   - **Copy this** - you'll need it in Step 3

5. **Share Pages with Integration:**
   - Go to a Notion page you want to test with
   - Click the `...` menu (top right)
   - Select **"Add connections"**
   - Choose **"Harvest Helper"**
   - This grants the integration access to that page

## Step 2: Install Dependencies

```bash
cd native-integration
npm install
```

This installs:
- `@notionhq/client` - Notion API client
- `express` - Web server
- `dotenv` - Environment variables
- `cors` - CORS support

## Step 3: Configure Environment

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```env
   # Notion Integration Token (from Step 1)
   NOTION_TOKEN=secret_your_token_here

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Button Service URL (where harvest-button.html is hosted)
   BUTTON_SERVICE_URL=https://harvest-helper.github.io/Notion-Integration
   ```

3. **Add your Notion token:**
   - Paste the token you copied in Step 1
   - Replace `secret_your_token_here` with your actual token

## Step 4: Run the Server

```bash
npm start
```

You should see:
```
🚀 Server running on port 3000
📝 OAuth callback: http://localhost:3000/oauth/notion/callback
🔗 Webhook endpoint: http://localhost:3000/webhook/notion
```

## Step 5: Test the Integration

### Get a Notion Page ID

1. Open any Notion page
2. Look at the URL: `https://notion.so/workspace/abc123def456`
3. The page ID is the last part: `abc123def456`
4. Copy this ID

### Add Timer Button to Page

**Option A: Using curl**
```bash
curl -X POST http://localhost:3000/api/add-timer-button \
  -H "Content-Type: application/json" \
  -d '{
    "pageId": "your-page-id-here",
    "notionToken": "your-notion-token-here"
  }'
```

**Option B: Using a simple test script**

Create `test.js`:
```javascript
import fetch from 'node-fetch';

const pageId = 'YOUR_PAGE_ID';
const notionToken = 'YOUR_NOTION_TOKEN';

const response = await fetch('http://localhost:3000/api/add-timer-button', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pageId, notionToken })
});

const result = await response.json();
console.log(result);
```

Run it:
```bash
node test.js
```

### Check Your Notion Page

1. Go back to your Notion page
2. You should see a new embed block with the Harvest timer button!
3. Click it to test

## Troubleshooting

### "Missing pageId or notionToken"
- Make sure you're passing both parameters
- Check that the token is correct

### "Failed to add button: Unauthorized"
- Verify the integration token is correct
- Make sure you've shared the page with the integration (Step 1, #5)

### "Failed to add button: Object not found"
- Check that the page ID is correct
- Make sure the page is shared with the integration

### Server won't start
- Make sure you're in the `native-integration` directory
- Run `npm install` if you haven't
- Check that port 3000 is available

## Next Steps

Once this works:
1. ✅ Test adding buttons to multiple pages
2. ✅ Set up webhooks for automatic button addition
3. ✅ Deploy to production (Vercel, Railway, etc.)
4. ✅ Create OAuth flow for public integration

## Quick Reference

**Server URL:** `http://localhost:3000`  
**Add Button Endpoint:** `POST /api/add-timer-button`  
**Health Check:** `GET /`  

**Notion Integration:** https://www.notion.com/my-integrations  
**Notion API Docs:** https://developers.notion.com

