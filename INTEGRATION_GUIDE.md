# Building a Notion Timer Button Integration

## Overview

To build a proper Notion integration (not just an embed) that adds a timer button to Notion pages and works on both web and desktop, you'll need to consider several components and limitations.

## Key Considerations

### 1. **Notion API Limitations**

**Important Constraints:**
- Notion's API does **not** support creating custom interactive button blocks directly
- Native Notion buttons have limited functionality (they can create pages, update properties, send notifications, but can't execute custom code)
- You cannot inject custom JavaScript or interactive elements directly into Notion pages via the API

**Available Options:**
1. **Embed Block** (what you currently have) - Works but requires manual embedding
2. **Notion Buttons** - Limited to predefined actions
3. **Database Properties** - Can be updated via API
4. **External Service** - Backend that monitors/updates Notion via API

### 2. **Architecture Options**

#### Option A: Enhanced Embed Approach (Current + Improvements)
**Pros:**
- ✅ Works immediately on web and desktop
- ✅ No complex backend needed
- ✅ Users can add to any page

**Cons:**
- ❌ Requires manual embedding per page
- ❌ Not a "native" Notion button
- ❌ Limited to iframe capabilities

**What to improve:**
- Better Notion page context detection
- Automatic page title/URL extraction
- Better mobile responsiveness

#### Option B: Notion API + Backend Service
**Pros:**
- ✅ Can create buttons that trigger actions
- ✅ Can update Notion pages automatically
- ✅ More integrated experience

**Cons:**
- ❌ Requires backend server (hosting costs)
- ❌ More complex authentication
- ❌ Buttons still limited to Notion's predefined actions

**Architecture:**
```
Notion Page → Notion Button → Webhook → Your Backend → Harvest API
```

#### Option C: Hybrid Approach (Recommended)
**Pros:**
- ✅ Best of both worlds
- ✅ Native Notion button for triggering
- ✅ External service for timer logic

**How it works:**
1. Create a Notion button that opens a URL/webhook
2. Backend service handles timer logic
3. Updates Notion page with timer status
4. Integrates with Harvest API

## Required Components

### 1. **Notion Integration Setup**

**Steps:**
1. Go to https://www.notion.com/my-integrations
2. Create a new integration
3. Get your **Internal Integration Token**
4. Set capabilities:
   - Read content
   - Insert content
   - Update content
5. Share pages with the integration

**Required Permissions:**
- `content:read` - To read page info
- `content:insert` - To add blocks
- `content:update` - To update timer status

### 2. **Backend Service** (if using Option B or C)

**Technology Stack Options:**
- Node.js/Express
- Python/Flask or FastAPI
- Serverless (Vercel, Netlify Functions, AWS Lambda)

**Responsibilities:**
- Handle Notion webhooks/button clicks
- Authenticate with Harvest API
- Start/stop timers
- Update Notion pages with timer status
- Store timer state (database or in-memory)

**Required APIs:**
- Notion API (https://developers.notion.com)
- Harvest API (https://help.getharvest.com/api-v2/)

### 3. **Authentication**

**Notion:**
- Internal Integration Token (server-side only)
- OAuth (if you want user-specific integrations)

**Harvest:**
- OAuth 2.0 flow
- Personal Access Token (for testing)
- Account ID and Access Token

**Storage:**
- User's Harvest credentials (encrypted)
- Notion page mappings
- Timer state

### 4. **Database/Storage**

**What to store:**
- User authentication tokens (Harvest)
- Active timer sessions
- Notion page → Harvest project mappings
- Timer history

**Options:**
- PostgreSQL/MySQL
- MongoDB
- Redis (for active sessions)
- Serverless database (Supabase, PlanetScale)

### 5. **Frontend (if needed)**

**If building a configuration UI:**
- React/Next.js app
- Or simple HTML form
- For users to:
  - Connect Harvest account
  - Map Notion pages to Harvest projects
  - Configure timer settings

## Implementation Steps

### Phase 1: Proof of Concept
1. ✅ Set up Notion integration
2. ✅ Test Notion API (read page, create button)
3. ✅ Test Harvest API (start timer, get projects)
4. ✅ Build simple backend that connects both

### Phase 2: Core Functionality
1. Create Notion button that triggers webhook
2. Backend receives webhook
3. Start Harvest timer with Notion page context
4. Update Notion page with timer status

### Phase 3: Enhanced Features
1. Timer status updates in real-time
2. Stop timer functionality
3. View timer history
4. Multiple timers per page
5. Project/task selection

### Phase 4: User Experience
1. OAuth flow for Harvest
2. Configuration UI
3. Error handling
4. Desktop app compatibility testing

## Technical Challenges

### 1. **Notion Button Limitations**
- Buttons can only trigger predefined actions
- Solution: Use button to open URL or trigger webhook

### 2. **Real-time Updates**
- Notion API doesn't support real-time subscriptions
- Solution: Polling or webhook callbacks

### 3. **Desktop App Compatibility**
- Desktop app uses Electron
- Embed blocks work, but API calls need proper handling
- Solution: Ensure HTTPS endpoints, proper CORS

### 4. **Authentication Flow**
- Users need to authenticate with both services
- Solution: OAuth flows for both, token storage

### 5. **State Management**
- Timer state needs to persist
- Solution: Backend database or session storage

## Recommended Tech Stack

**Backend:**
- Node.js + Express (or Next.js API routes)
- TypeScript for type safety
- `@notionhq/client` - Official Notion SDK
- `harvest` npm package or direct API calls

**Database:**
- PostgreSQL (via Supabase or Railway)
- Redis for session management

**Hosting:**
- Vercel (for serverless)
- Railway (for full-stack)
- Render (simple deployment)

**Frontend (if needed):**
- Next.js for full-stack app
- Or keep it simple with static HTML

## Cost Considerations

**Free Tier Options:**
- Notion API: Free
- Harvest API: Free (with Harvest account)
- Vercel: Free tier available
- Supabase: Free tier available

**Potential Costs:**
- Hosting (if not using free tier)
- Database hosting
- Domain name (optional)

## Next Steps

1. **Decide on approach:**
   - Option A: Improve current embed (simplest)
   - Option B: Full backend integration (most powerful)
   - Option C: Hybrid (recommended balance)

2. **Start with Phase 1:**
   - Set up Notion integration
   - Test APIs
   - Build minimal proof of concept

3. **Iterate:**
   - Add features incrementally
   - Test on both web and desktop
   - Gather user feedback

## Resources

- [Notion API Documentation](https://developers.notion.com)
- [Harvest API Documentation](https://help.getharvest.com/api-v2/)
- [Notion SDK (Node.js)](https://github.com/makenotion/notion-sdk-js)
- [Notion Integrations Guide](https://developers.notion.com/docs/create-a-notion-integration)

