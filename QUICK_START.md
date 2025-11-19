# Quick Start - Test in 2 Minutes

## Step 1: Test the Button (30 seconds)

Open this URL in your browser:
```
https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=test&page_title=Test%20Page&page_url=https://notion.so/test
```

✅ You should see a Harvest timer button appear

## Step 2: Add to Notion (90 seconds)

1. **Open any Notion page**

2. **Type `/embed`** and select "Embed"

3. **Paste this URL** (replace with your page info):
   ```
   https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=YOUR_PAGE_ID&page_title=Your%20Page%20Title&page_url=https://notion.so/YOUR_PAGE_ID
   ```

4. **Get your page info:**
   - Open your Notion page
   - Copy the page ID from the URL (the long string)
   - Copy the page title
   - URL encode the title (spaces → `%20`)

5. **Click the button** - it should open Harvest!

## Example

If your Notion page is:
- URL: `https://notion.so/myworkspace/abc123def456`
- Title: `My Project Page`

Use this embed URL:
```
https://harvest-helper.github.io/Notion-Integration/harvest-button.html?page_id=abc123def456&page_title=My%20Project%20Page&page_url=https://notion.so/myworkspace/abc123def456
```

## That's It! 🎉

The button should now work in your Notion page.

For detailed testing, see [TESTING.md](TESTING.md)

