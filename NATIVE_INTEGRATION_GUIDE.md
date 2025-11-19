# Creating a Native Notion Integration (Like Harvest's "Start Timer" Button)

## How Harvest's Integration Actually Works

**Important Discovery:** Harvest's "Start timer" button in Notion is **NOT** a native Notion integration. It's actually a **browser extension** that injects the button into Notion's web interface.

### Key Facts:
- ✅ Works on **Notion web** (Chrome, Firefox, Edge)
- ❌ Does **NOT** work on **Notion desktop app**
- Uses browser extension APIs to inject UI elements
- Not an official Notion API integration

Source: [Harvest's Notion Integration Documentation](https://support.getharvest.com/hc/en-us/articles/28496460983309-Notion-Track-time-from-Notion-tasks)

## The Reality: Notion API Limitations

Unfortunately, **Notion's API does NOT support adding custom UI buttons natively**. The Notion API can:

✅ **What Notion API CAN do:**
- Read/write pages and databases
- Create/update content blocks
- Manage properties and relations
- OAuth authentication
- Webhook subscriptions

❌ **What Notion API CANNOT do:**
- Add custom UI buttons to the interface
- Inject JavaScript into Notion pages
- Modify Notion's native UI
- Add buttons to the top bar or sidebars

## Your Options for Native-Looking Integration

### Option 1: Browser Extension (Like Harvest) ⭐ Recommended

**How it works:**
- Chrome/Firefox/Edge extension
- Injects JavaScript into Notion web pages
- Adds button to Notion's UI
- Works on web only (not desktop)

**Pros:**
- ✅ Can add buttons anywhere in Notion UI
- ✅ Feels native to users
- ✅ Can access page context directly
- ✅ No Notion API needed for UI injection

**Cons:**
- ❌ Only works on web (not desktop app)
- ❌ Users must install browser extension
- ❌ More complex to build and maintain
- ❌ Requires browser store approval

**Implementation:**
```javascript
// Content script that runs on notion.so pages
// Injects button into Notion's top bar or page header
const button = document.createElement('button');
button.textContent = 'Start Timer';
button.onclick = () => {
  // Open Harvest widget
  window.open('https://platform.harvestapp.com/platform/timer?...');
};
// Inject into Notion's UI
document.querySelector('.notion-topbar').appendChild(button);
```

### Option 2: Notion API + Database Integration

**How it works:**
- Use Notion API to create/manage pages
- Add properties to databases
- Use Notion's native button blocks (limited functionality)
- Backend service handles timer logic

**Pros:**
- ✅ Works on web AND desktop
- ✅ Official Notion integration
- ✅ Can be published to Integration Gallery
- ✅ More reliable long-term

**Cons:**
- ❌ Can't add custom UI buttons
- ❌ Limited to Notion's native button blocks
- ❌ Buttons can only trigger predefined actions
- ❌ Less flexible than browser extension

**What you CAN do:**
- Create pages with timer status
- Update database properties with timer data
- Use Notion's native buttons (create page, update property, etc.)
- Store timer state in Notion databases

### Option 3: Hybrid Approach

**How it works:**
- Browser extension for web users (native button)
- Notion API integration for desktop users (database-based)
- Same backend service for both

**Pros:**
- ✅ Best user experience on web
- ✅ Works on desktop too
- ✅ Covers all platforms

**Cons:**
- ❌ Most complex to build
- ❌ Need to maintain two codebases

## Building a Browser Extension (Like Harvest)

### Architecture

```
Browser Extension
├── manifest.json          # Extension configuration
├── content-script.js      # Runs on notion.so pages
├── background.js          # Service worker
├── popup.html            # Extension popup (optional)
└── icons/                # Extension icons
```

### Key Components

1. **Manifest.json**
```json
{
  "manifest_version": 3,
  "name": "Harvest Helper for Notion",
  "version": "1.0.0",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "content_scripts": [{
    "matches": ["https://www.notion.so/*"],
    "js": ["content-script.js"],
    "run_at": "document_end"
  }],
  "action": {
    "default_popup": "popup.html"
  }
}
```

2. **Content Script** (injects button into Notion)
```javascript
// Wait for Notion to load
function waitForNotion() {
  return new Promise((resolve) => {
    if (document.querySelector('.notion-topbar')) {
      resolve();
    } else {
      const observer = new MutationObserver(() => {
        if (document.querySelector('.notion-topbar')) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
}

async function injectTimerButton() {
  await waitForNotion();
  
  // Get current page info
  const pageUrl = window.location.href;
  const pageTitle = document.querySelector('h1')?.textContent || 'Notion Page';
  
  // Create button
  const button = document.createElement('button');
  button.textContent = '⏱ Start Timer';
  button.className = 'harvest-timer-button';
  button.onclick = () => {
    const harvestUrl = `https://platform.harvestapp.com/platform/timer?` +
      `app_name=Notion` +
      `&permalink=${encodeURIComponent(pageUrl)}` +
      `&external_item_name=${encodeURIComponent(pageTitle)}`;
    
    window.open(harvestUrl, 'harvest-timer', 'width=500,height=400');
  };
  
  // Inject into Notion's top bar
  const topbar = document.querySelector('.notion-topbar');
  if (topbar && !topbar.querySelector('.harvest-timer-button')) {
    topbar.appendChild(button);
  }
}

// Run on page load and navigation
injectTimerButton();
```

3. **Styling**
```css
.harvest-timer-button {
  background: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;
}
```

### Publishing Browser Extension

1. **Chrome Web Store**
   - Developer account ($5 one-time fee)
   - Submit extension for review
   - Usually approved in 1-3 days

2. **Firefox Add-ons**
   - Free developer account
   - Submit for review
   - Usually approved in 1-2 days

3. **Edge Add-ons**
   - Can use Chrome extension
   - Or submit separately

## Building a Notion API Integration

### Steps

1. **Create Integration**
   - Go to https://www.notion.com/my-integrations
   - Create new integration
   - Get API token

2. **OAuth Setup** (for public integration)
   - Register OAuth app
   - Handle OAuth flow
   - Store user tokens

3. **Build Backend Service**
   - Handle timer logic
   - Integrate with Harvest API
   - Update Notion pages/databases

4. **Use Native Notion Buttons**
   - Create button blocks via API
   - Buttons can trigger webhooks
   - Update properties when clicked

5. **Submit to Integration Gallery**
   - Follow Notion's guidelines
   - Submit for review
   - Get published

### Example: Notion Button Block

```javascript
// Create a button that triggers a webhook
const response = await notion.blocks.children.append({
  block_id: pageId,
  children: [{
    object: 'block',
    type: 'button',
    button: {
      text: [{ type: 'text', text: { content: 'Start Timer' } }],
      url: 'https://your-backend.com/webhook/start-timer?page_id=' + pageId
    }
  }]
});
```

## Comparison: Embed vs Browser Extension vs API

| Feature | Embed (Current) | Browser Extension | Notion API |
|---------|----------------|-------------------|------------|
| **Web Support** | ✅ | ✅ | ✅ |
| **Desktop Support** | ⚠️ Limited | ❌ | ✅ |
| **Native UI Button** | ❌ | ✅ | ⚠️ Limited |
| **User Installation** | None | Required | Required |
| **Complexity** | Low | Medium | High |
| **Maintenance** | Low | Medium | High |
| **Distribution** | Just share URL | Browser stores | Notion Gallery |

## Recommendation

**For maximum compatibility and native feel:**

1. **Short term:** Keep the embed solution (works everywhere)
2. **Medium term:** Build browser extension for web users
3. **Long term:** Build Notion API integration for desktop support

**Or focus on browser extension** if you want the native button experience like Harvest (knowing it won't work on desktop).

## Next Steps

Would you like me to:
1. Create a browser extension starter project?
2. Build a Notion API integration example?
3. Create a hybrid solution?

Let me know which approach interests you most!

