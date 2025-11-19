import { Client } from '@notionhq/client';

/**
 * Add a Harvest timer button block to a Notion page
 */
export async function addTimerButtonToPage(pageId, notionToken) {
  const notion = new Client({ auth: notionToken });

  try {
    // Get page info to build Harvest URL
    const page = await notion.pages.retrieve({ page_id: pageId });
    const pageUrl = page.url || `https://notion.so/${pageId.replace(/-/g, '')}`;
    
    // Try to get page title
    let pageTitle = 'Notion Page';
    if (page.properties) {
      const titleProp = Object.values(page.properties).find(
        prop => prop.type === 'title'
      );
      if (titleProp && titleProp.title && titleProp.title[0]) {
        pageTitle = titleProp.title[0].plain_text;
      }
    }

    // Use Harvest's platform.js approach via embed block
    // This creates a native Harvest timer button that works on web and desktop
    const buttonEmbedUrl = `${process.env.BUTTON_SERVICE_URL || 'https://harvest-helper.github.io/Notion-Integration'}/harvest-button.html?` +
      `page_id=${encodeURIComponent(pageId)}` +
      `&page_title=${encodeURIComponent(pageTitle)}` +
      `&page_url=${encodeURIComponent(pageUrl)}`;

    // Create embed block that loads the Harvest button
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          object: 'block',
          type: 'embed',
          embed: {
            url: buttonEmbedUrl
          }
        }
      ]
    });

    return {
      success: true,
      blockId: response.results[0]?.id,
      embedUrl: buttonEmbedUrl
    };
  } catch (error) {
    console.error('Error adding button to page:', error);
    throw new Error(`Failed to add button: ${error.message}`);
  }
}

/**
 * Handle Notion webhook events
 */
export async function handleWebhook(event) {
  console.log('Handling webhook event:', event.type);
  
  // In production, you'd:
  // 1. Verify webhook signature
  // 2. Get user's stored Notion token
  // 3. Automatically add button to new pages
  
  if (event.type === 'page.created') {
    // Optionally auto-add button to new pages
    // const { pageId } = event.data;
    // await addTimerButtonToPage(pageId, userNotionToken);
  }
  
  return { handled: true };
}

/**
 * Build Harvest widget URL with Notion page context
 */
function buildHarvestUrl({ pageUrl, pageTitle, pageId }) {
  const baseUrl = 'https://platform.harvestapp.com/platform/timer';
  const params = new URLSearchParams({
    app_name: 'Notion',
    closable: 'false',
    permalink: pageUrl,
    external_item_name: pageTitle,
    external_item_id: pageId
  });
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Check if page already has a timer button
 */
export async function hasTimerButton(pageId, notionToken) {
  const notion = new Client({ auth: notionToken });
  
  try {
    const blocks = await notion.blocks.children.list({ block_id: pageId });
    
    return blocks.results.some(block => 
      block.type === 'button' && 
      block.button?.url?.includes('platform.harvestapp.com')
    );
  } catch (error) {
    console.error('Error checking for button:', error);
    return false;
  }
}

