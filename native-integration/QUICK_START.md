# Quick Start - Get Running in 5 Minutes

## Step 1: Create Notion Integration (2 min)

1. Go to: https://www.notion.com/my-integrations
2. Click **"+ New integration"**
3. Name: `Harvest Helper`
4. Copy the **"Internal Integration Token"** (starts with `secret_`)

## Step 2: Configure Environment (1 min)

```bash
cd native-integration
cp .env.example .env
```

Edit `.env` and add your token:
```env
NOTION_TOKEN=secret_your_actual_token_here
```

## Step 3: Start Server (30 sec)

```bash
npm start
```

You should see:
```
🚀 Server running on port 3000
```

## Step 4: Get Page ID (30 sec)

1. Open any Notion page
2. Share it with your integration:
   - Click `...` menu → "Add connections" → "Harvest Helper"
3. Copy the page ID from the URL:
   - `https://notion.so/workspace/abc123def456`
   - Page ID is: `abc123def456`

## Step 5: Add Button (30 sec)

**Option A: Using test script**
```bash
node test-add-button.js abc123def456 secret_your_token
```

**Option B: Using curl**
```bash
curl -X POST http://localhost:3000/api/add-timer-button \
  -H "Content-Type: application/json" \
  -d '{
    "pageId": "abc123def456",
    "notionToken": "secret_your_token"
  }'
```

## Step 6: Check Notion Page

Go back to your Notion page - you should see the Harvest timer button! 🎉

## Troubleshooting

**"Missing pageId or notionToken"**
- Make sure you're passing both parameters

**"Unauthorized"**
- Verify the token is correct
- Make sure you shared the page with the integration

**"Object not found"**
- Check the page ID is correct
- Ensure page is shared with integration

**Server won't start**
- Run `npm install` first
- Check port 3000 is available

## Next Steps

- See [SETUP.md](SETUP.md) for detailed instructions
- See [README.md](README.md) for full documentation

