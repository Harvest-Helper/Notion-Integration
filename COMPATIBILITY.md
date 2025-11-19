# Notion Web vs Desktop Compatibility

## Quick Answer

**Yes, but with caveats.** The embed-based button will work on both web and desktop, but there are some important limitations to be aware of.

## Compatibility Breakdown

### ✅ What Works on Both Platforms

1. **Embed Block Itself**
   - Embed blocks are supported on both web and desktop
   - Your button HTML will load and display

2. **Button Display**
   - The "Track Time" button will appear on both platforms
   - Styling and layout work the same

3. **Basic JavaScript**
   - JavaScript functionality works in both environments

### ⚠️ Potential Issues on Desktop (Electron)

1. **Modal Overlays**
   - Custom modal overlays (like in `button.html`) may have issues in Electron
   - Fixed positioning and z-index can behave differently
   - **Solution**: Use `button-simple.html` which opens in a new window instead

2. **Iframe Restrictions**
   - Electron has stricter iframe security policies
   - Cross-origin iframes might be blocked
   - Harvest widget iframe should work, but authentication flows might be affected

3. **External Authentication**
   - Notion's documentation states: *"Embeds that require login to an external site will not work on Notion's desktop app or mobile apps"*
   - Harvest widget requires login, so this could be a problem
   - **However**: If Harvest's widget uses OAuth popups, those should still work

4. **New Window Behavior**
   - Opening new windows/tabs works differently in Electron
   - `target="_blank"` should work, but might open in Electron's internal browser

## Recommended Approach

### For Maximum Compatibility

**Use `button-simple.html`** - Opens Harvest widget in a new window/tab:
- ✅ Works reliably on both web and desktop
- ✅ Avoids modal overlay issues
- ✅ Harvest authentication flows work normally
- ✅ User can close window when done

### Testing Checklist

Test both versions on:

1. **Notion Web** (Chrome/Safari)
   - [ ] Button appears correctly
   - [ ] Click opens widget (modal or new window)
   - [ ] Harvest login works
   - [ ] Timer starts correctly
   - [ ] Page context (URL/title) passed correctly

2. **Notion Desktop App** (macOS/Windows)
   - [ ] Button appears correctly
   - [ ] Click opens widget
   - [ ] Harvest login works (may open in external browser)
   - [ ] Timer starts correctly
   - [ ] Page context passed correctly

## Known Limitations

### Desktop App Specific

1. **Modal Approach (`button.html`)**
   - May not work perfectly due to Electron's rendering
   - Fixed position overlays can be problematic
   - **Recommendation**: Test thoroughly, fallback to simple version

2. **Authentication Flows**
   - OAuth redirects might open in external browser
   - User may need to authenticate in browser, then return to Notion
   - This is a Notion/Electron limitation, not your code

3. **Iframe Sandboxing**
   - Electron has stricter iframe security
   - Some iframe features might be restricted
   - Harvest's widget should handle this, but worth testing

## Best Practices

1. **Always Test Both Platforms**
   - Don't assume web behavior = desktop behavior
   - Electron can have unexpected quirks

2. **Provide Fallback Options**
   - Offer both modal and new-window versions
   - Let users choose what works best for them

3. **Clear User Instructions**
   - Tell users to test on their preferred platform
   - Provide troubleshooting tips

4. **Monitor User Feedback**
   - Desktop users may report different issues
   - Be ready to adjust approach based on real usage

## Alternative Solutions

If embed approach has issues on desktop:

1. **Browser Extension**
   - Inject button directly into Notion pages
   - Works identically on web and desktop
   - More complex to build and distribute

2. **Notion API Integration**
   - Create native Notion button via API
   - Buttons have limited functionality
   - Would still need to open external widget

3. **Bookmarklet**
   - JavaScript bookmark that adds button
   - Works on any platform
   - Requires user to add bookmark manually

## Current Status

Based on Notion's documentation and Electron behavior:

- **Web**: Should work perfectly ✅
- **Desktop**: Should work, but may have authentication quirks ⚠️
- **Mobile**: Likely won't work (Notion mobile has limited embed support) ❌

## Recommendation

**Start with `button-simple.html`** (opens in new window):
- Most reliable across platforms
- Avoids Electron modal issues
- Harvest authentication works normally
- Simple and straightforward

Then test `button.html` (modal) if you prefer that UX, but be prepared to fall back to the simple version if desktop users report issues.

