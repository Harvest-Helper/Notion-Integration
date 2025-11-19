# GitHub Pages Setup Guide

## Quick Setup Steps

1. **Go to Repository Settings**
   - Navigate to: https://github.com/Harvest-Helper/Notion-Integration/settings/pages

2. **Enable GitHub Pages**
   - Under "Source", select "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
   - Click "Save"

3. **Wait for Deployment**
   - GitHub will build and deploy (usually 1-2 minutes)
   - You'll see a green checkmark when it's live

4. **Get Your URLs**
   - Base URL: `https://harvest-helper.github.io/Notion-Integration/`
   - Button (Simple): `https://harvest-helper.github.io/Notion-Integration/button-simple.html`
   - Button (Modal): `https://harvest-helper.github.io/Notion-Integration/button.html`
   - Full Widget: `https://harvest-helper.github.io/Notion-Integration/index.html`

## Testing in Notion

1. Open any Notion page
2. Type `/embed` or click the `+` button
3. Select "Embed"
4. Paste one of the URLs above (start with `button-simple.html`)
5. The button should appear!

## Troubleshooting

- **404 Error**: Wait a few minutes for GitHub Pages to deploy
- **Not Loading**: Make sure you're using HTTPS (required by Notion)
- **CORS Issues**: GitHub Pages should handle this automatically

## Updating Files

After pushing changes to GitHub:
1. GitHub Pages automatically rebuilds
2. Changes appear within 1-2 minutes
3. You may need to hard refresh in Notion (Cmd+Shift+R / Ctrl+Shift+R)

