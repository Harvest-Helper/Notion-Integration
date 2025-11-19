/**
 * Start a Harvest timer via API
 * Note: This is optional - the button can also just open the widget URL
 */
export async function startHarvestTimer({ pageUrl, pageTitle, pageId, harvestToken }) {
  // Harvest API endpoint for starting a timer
  const harvestApiUrl = 'https://api.harvestapp.com/v2/time_entries';
  
  try {
    // Get user's account info
    const accountResponse = await fetch('https://id.getharvest.com/api/v2/accounts', {
      headers: {
        'Authorization': `Bearer ${harvestToken}`,
        'Harvest-Account-Id': process.env.HARVEST_ACCOUNT_ID || ''
      }
    });

    if (!accountResponse.ok) {
      throw new Error('Failed to authenticate with Harvest');
    }

    // For now, just return the widget URL
    // In a full implementation, you'd create a time entry via API
    const widgetUrl = `https://platform.harvestapp.com/platform/timer?` +
      `app_name=Notion` +
      `&permalink=${encodeURIComponent(pageUrl)}` +
      `&external_item_name=${encodeURIComponent(pageTitle)}` +
      `&external_item_id=${encodeURIComponent(pageId)}`;

    return {
      widgetUrl,
      message: 'Use widget URL to start timer'
    };
  } catch (error) {
    console.error('Harvest API error:', error);
    throw new Error(`Failed to start timer: ${error.message}`);
  }
}

