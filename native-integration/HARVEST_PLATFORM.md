# Using Harvest Platform.js for Native Buttons

This integration uses [Harvest's platform.js](https://github.com/harvesthq/platform/blob/main/button.md) to create native timer buttons that work on both web and desktop Notion.

## How It Works

1. **Embed Block**: Notion API creates an embed block pointing to `harvest-button.html`
2. **Harvest Platform.js**: The HTML page loads Harvest's `platform.js` script
3. **Native Button**: The script automatically converts `<div class="harvest-timer">` into an interactive timer button
4. **Works Everywhere**: Since it's an embed block, it works on web, desktop, and mobile

## Key Advantages

✅ **Native Harvest Button**: Uses Harvest's official button system  
✅ **Works on Desktop**: Embed blocks work in Notion desktop app  
✅ **Interactive**: Full timer functionality (start, stop, log time)  
✅ **Auto-styling**: Harvest handles all button styling  
✅ **No Custom Code**: Leverages Harvest's maintained platform

## Implementation

### 1. HTML Page (`harvest-button.html`)

```html
<script>
  window._harvestPlatformConfig = {
    "applicationName": "Notion",
    "permalink": "https://notion.so/page-url"
  };
</script>
<script async src="https://platform.harvestapp.com/assets/platform.js"></script>

<div class="harvest-timer"
  data-item='{"id":"page-id","name":"Page Title"}'
  data-permalink="https://notion.so/page-url">
</div>
```

### 2. Notion API Integration

The integration adds an embed block to pages:

```javascript
await notion.blocks.children.append({
  block_id: pageId,
  children: [{
    object: 'block',
    type: 'embed',
    embed: {
      url: 'https://harvest-helper.github.io/Notion-Integration/harvest-button.html?...'
    }
  }]
});
```

## Configuration Options

Based on [Harvest's documentation](https://github.com/harvesthq/platform/blob/main/button.md):

### Global Configuration

- `applicationName` (required): "Notion"
- `permalink` (required): Notion page URL
- `skipStyling` (optional): `false` to use Harvest's default styling

### Timer Element Attributes

- `data-item` (required): JSON with `id` and `name` of the Notion page
- `data-permalink` (required): URL to the Notion page
- `data-group` (optional): For project grouping
- `data-default` (optional): Pre-select a Harvest project

## Example Output

The button will appear as a native Harvest timer button with:
- Start/Stop timer functionality
- Time entry dialog
- Project/task selection
- Automatic linking to Notion page

## Testing

1. Deploy `harvest-button.html` to GitHub Pages
2. Test embed URL directly in browser
3. Use Notion API to add embed block to a page
4. Verify button appears and works on:
   - Notion web
   - Notion desktop app
   - Notion mobile (if supported)

## Resources

- [Harvest Button Documentation](https://github.com/harvesthq/platform/blob/main/button.md)
- [Harvest Platform.js](https://platform.harvestapp.com/assets/platform.js)
- [Notion API - Embed Blocks](https://developers.notion.com/reference/block#embed-blocks)

