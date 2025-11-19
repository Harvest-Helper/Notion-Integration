import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import { addTimerButtonToPage, handleWebhook } from './notion-service.js';
import { startHarvestTimer } from './harvest-service.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Harvest Notion Native Integration',
    version: '1.0.0'
  });
});

// OAuth callback for Notion
app.get('/oauth/notion/callback', async (req, res) => {
  const { code, state } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    // Exchange code for access token
    const response = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NOTION_REDIRECT_URI
      })
    });

    const data = await response.json();
    
    if (data.access_token) {
      // Store token (in production, use a database)
      // For now, redirect to success page
      res.redirect(`/success?token=${data.access_token}`);
    } else {
      res.status(400).json({ error: 'Failed to get access token', details: data });
    }
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).json({ error: 'OAuth callback failed' });
  }
});

// Webhook endpoint for Notion page events
app.post('/webhook/notion', async (req, res) => {
  try {
    const event = req.body;
    
    // Verify webhook (add signature verification in production)
    console.log('Received Notion webhook:', event.type);
    
    // Handle different event types
    if (event.type === 'page.created' || event.type === 'page.updated') {
      await handleWebhook(event);
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// API endpoint to add timer button to a specific page
app.post('/api/add-timer-button', async (req, res) => {
  try {
    const { pageId, notionToken } = req.body;
    
    if (!pageId || !notionToken) {
      return res.status(400).json({ error: 'Missing pageId or notionToken' });
    }

    const result = await addTimerButtonToPage(pageId, notionToken);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error adding timer button:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to start Harvest timer
app.post('/api/start-timer', async (req, res) => {
  try {
    const { pageUrl, pageTitle, pageId, harvestToken } = req.body;
    
    if (!harvestToken) {
      return res.status(400).json({ error: 'Missing harvestToken' });
    }

    const result = await startHarvestTimer({
      pageUrl,
      pageTitle,
      pageId,
      harvestToken
    });
    
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error starting timer:', error);
    res.status(500).json({ error: error.message });
  }
});

// Success page after OAuth
app.get('/success', (req, res) => {
  res.send(`
    <html>
      <head><title>Integration Connected</title></head>
      <body>
        <h1>✅ Notion Integration Connected!</h1>
        <p>You can now use the Harvest timer button in your Notion pages.</p>
        <p>Token: ${req.query.token ? 'Received' : 'Missing'}</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 OAuth callback: http://localhost:${PORT}/oauth/notion/callback`);
  console.log(`🔗 Webhook endpoint: http://localhost:${PORT}/webhook/notion`);
});

