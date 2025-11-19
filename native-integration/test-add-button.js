#!/usr/bin/env node

/**
 * Quick test script to add a Harvest timer button to a Notion page
 * 
 * Usage:
 *   node test-add-button.js <page-id> <notion-token>
 * 
 * Example:
 *   node test-add-button.js abc123def456 secret_xyz...
 */

import dotenv from 'dotenv';
dotenv.config();

const pageId = process.argv[2] || process.env.NOTION_PAGE_ID;
const notionToken = process.argv[3] || process.env.NOTION_TOKEN;

if (!pageId || !notionToken) {
  console.error('❌ Missing required parameters');
  console.log('\nUsage:');
  console.log('  node test-add-button.js <page-id> <notion-token>');
  console.log('\nOr set environment variables:');
  console.log('  NOTION_PAGE_ID=your-page-id');
  console.log('  NOTION_TOKEN=your-token');
  console.log('\nGet your page ID from the Notion URL:');
  console.log('  https://notion.so/workspace/abc123def456');
  console.log('                              ^^^^^^^^^^^^');
  console.log('                              This is your page ID');
  process.exit(1);
}

const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

console.log('🚀 Adding Harvest timer button to Notion page...');
console.log(`📄 Page ID: ${pageId}`);
console.log(`🔗 Server: ${serverUrl}\n`);

try {
  const response = await fetch(`${serverUrl}/api/add-timer-button`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageId, notionToken })
  });

  const result = await response.json();

  if (response.ok && result.success) {
    console.log('✅ Success! Timer button added to page.');
    console.log(`\n📦 Block ID: ${result.result.blockId}`);
    console.log(`🔗 Embed URL: ${result.result.embedUrl}`);
    console.log('\n✨ Check your Notion page - the button should appear!');
  } else {
    console.error('❌ Error:', result.error || result);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to add button:', error.message);
  console.log('\n💡 Make sure the server is running:');
  console.log('   npm start');
  process.exit(1);
}

