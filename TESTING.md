# Testing Guide

Step-by-step guide to test the Harvest Notion integration.

## Prerequisites

- A Notion account
- A Harvest account (for testing the timer button)
- GitHub Pages should be enabled (already done ✅)

## Step 1: Test harvest-button.html Directly

First, verify the button loads correctly in a browser:

1. **Open in browser:**
   ```
   https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=test123&page_title=Test%20Page&page_url=https://notion.so/test
   ```

2. **What to check:**
   - ✅ Page loads without errors
   - ✅ Harvest button appears (may take a moment for platform.js to load)
   - ✅ Button is styled and clickable
   - ✅ No console errors (open DevTools F12)

3. **If button doesn't appear:**
   - Check browser console for errors
   - Verify platform.js is loading: `https://platform.harvestapp.com/assets/platform.js`
   - Wait a few seconds (script loads asynchronously)

## Step 2: Test in Notion Web

1. **Open Notion in your browser** (notion.so)

2. **Create a test page:**
   - Click "+ New page" or use an existing page
   - Note the page URL (you'll need it)

3. **Add the embed:**
   - Type `/embed` or click the `+` button
   - Select "Embed"
   - Paste this URL (replace with your actual page info):
     ```
     https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=YOUR_PAGE_ID&page_title=Your%20Page%20Title&page_url=https://notion.so/YOUR_WORKSPACE/YOUR_PAGE_ID
     ```

4. **Get your page info:**
   - Page ID: The long string in your Notion URL (e.g., `abc123def456`)
   - Page Title: Your page title (URL encode it: `My Page` → `My%20Page`)
   - Page URL: Full Notion URL

5. **What to check:**
   - ✅ Embed block appears
   - ✅ Harvest button renders inside the embed
   - ✅ Button is clickable
   - ✅ Clicking opens Harvest timer dialog
   - ✅ Page title appears in Harvest time entry
   - ✅ Page URL is linked in Harvest

## Step 3: Test in Notion Desktop App

1. **Open Notion desktop app** (if you have it installed)

2. **Navigate to the same page** you tested in Step 2

3. **What to check:**
   - ✅ Embed block appears (same as web)
   - ✅ Harvest button renders correctly
   - ✅ Button is clickable
   - ✅ Timer functionality works
   - ✅ Harvest authentication works

## Step 4: Test Timer Functionality

1. **Click the Harvest button** in your Notion page

2. **Verify Harvest widget:**
   - ✅ Timer dialog opens
   - ✅ Page title is pre-filled in notes
   - ✅ Page URL is available as reference link
   - ✅ Can select project/task
   - ✅ Can start timer
   - ✅ Can log time entry

3. **Test time entry:**
   - Start a timer
   - Let it run for a few seconds
   - Stop and log the time
   - Verify it appears in your Harvest timesheet

## Step 5: Test Native Integration (Optional)

If you want to test the backend service that automatically adds buttons:

### 5a. Set Up Backend Service

1. **Navigate to native-integration folder:**
   ```bash
   cd native-integration
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Notion integration token
   ```

4. **Create Notion Integration:**
   - Go to https://www.notion.com/my-integrations
   - Click "+ New integration"
   - Name it "Harvest Helper"
   - Copy the "Internal Integration Token"
   - Add to `.env` as `NOTION_TOKEN`

5. **Run the server:**
   ```bash
   npm start
   ```

### 5b. Test API Endpoint

1. **Get a Notion page ID** (from a page URL)

2. **Call the API:**
   ```bash
   curl -X POST http://localhost:3000/api/add-timer-button \
     -H "Content-Type: application/json" \
     -d '{
       "pageId": "your-page-id",
       "notionToken": "your-notion-token"
     }'
   ```

3. **Check Notion page:**
   - ✅ New embed block should appear
   - ✅ Harvest button should be visible

## Troubleshooting

### Button doesn't appear

**Check:**
- Browser console for JavaScript errors
- Network tab to verify platform.js loads
- URL parameters are correct (page_id, page_title, page_url)

**Fix:**
- Ensure all URL parameters are properly encoded
- Check that GitHub Pages is serving the file correctly
- Verify Harvest's platform.js is accessible

### Button appears but doesn't work

**Check:**
- Are you logged into Harvest?
- Does Harvest widget open when clicked?
- Any CORS errors in console?

**Fix:**
- Log into Harvest in the same browser
- Check Harvest account is active
- Verify platform.js loaded correctly

### Embed doesn't show in Notion

**Check:**
- URL is correct and accessible
- Notion allows the embed (some domains blocked)
- Page has embed permissions

**Fix:**
- Test URL directly in browser first
- Use HTTPS (required by Notion)
- Check Notion page settings

## Quick Test URLs

### Test 1: Basic Button
```
https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=test&page_title=Test&page_url=https://notion.so/test
```

### Test 2: With Real Page Info
Replace with your actual Notion page details:
```
https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=YOUR_PAGE_ID&page_title=Your%20Page&page_url=https://notion.so/YOUR_PAGE_ID
```

## Success Criteria

✅ Button appears in browser test  
✅ Button appears in Notion web embed  
✅ Button appears in Notion desktop embed  
✅ Button is clickable and opens Harvest widget  
✅ Page context (title/URL) is passed to Harvest  
✅ Timer functionality works (start/stop/log)  
✅ Time entries appear in Harvest timesheet  

## Next Steps After Testing

Once testing is successful:
1. Share with your team
2. Set up the native integration for automatic button addition
3. Consider submitting to Notion Integration Gallery
4. Gather user feedback

---

**Need help?** Check the [README.md](README.md) or [native-integration/README.md](native-integration/README.md) for more details.

