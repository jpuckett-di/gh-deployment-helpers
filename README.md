# Deployment Log Helper - Userscript

This userscript automatically adds a "Copy URL Log" button to GitHub Actions pages that copies the current page URL as plain text and a formatted deployment log as rich HTML.

## Features

- 🔘 **One-click button** - Adds a "Copy URL Log" button to the top-left corner of GitHub Actions pages
- 📋 **Dual clipboard formats** - Copies current page URL as plain text + rich HTML deployment log simultaneously
- 🕒 **Auto timestamp** - Generates timestamp in HH:MM format (Central Time) for HTML format
- 🌐 **Current page URL** - Uses the current GitHub Actions page URL automatically
- ❌ **Removable** - Click the × to remove the button if not needed
- ✅ **Success feedback** - Shows a green toast notification when copied

## How to Install

1. Install a userscript manager:

   - **Chrome/Edge**: [Violentmonkey](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) or [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - **Firefox**: [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/) or [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - **Safari**: [Tampermonkey](https://apps.apple.com/us/app/tampermonkey/id1482490089)

2. Copy the contents of `main.user.js`
3. Open your userscript manager dashboard
4. Click "Create a new script" or the "+" button
5. Replace the template code with the copied script
6. Save the script (Ctrl+S or Cmd+S)

## How to Use

1. Navigate to any GitHub Actions run page matching the pattern:
   `https://github.com/carsdotcom/di-websites-platform/actions/runs/*`

2. You'll see a green "Copy URL Log" button in the top-left corner with an × close button:
   **[×] Copy URL Log**

3. Click the button to:

   - Copy the current page URL as plain text
   - Copy a timestamped deployment log message as rich HTML
   - Show a success notification

4. Click the × to remove the button if you don't need it

## Example Output

**Plain Text:**

```
https://github.com/carsdotcom/di-websites-platform/actions/runs/12345
```

**Rich HTML:**
_Formatted as: `17:26 Jeff Puckett started <a href="https://github.com/carsdotcom/di-websites-platform/actions/runs/12345">deployment</a>`_

- Time and text with Arial 11pt styling
- "Jeff Puckett" as clickable email link with rich person metadata
- "deployment" as clickable link to the current GitHub Actions page

## Browser Requirements

- **Modern browsers**: Requires support for the Clipboard API (`navigator.clipboard`)
- Supports Chrome 76+, Firefox 63+, Safari 13.1+, Edge 79+
- Must allow clipboard access (you may see a permission prompt on first use)
- Requires a userscript manager (Violentmonkey, Tampermonkey, etc.)

## Files

- `main.user.js` - The complete userscript ready for installation

## URL Pattern

The script only activates on GitHub Actions pages matching:

```
https://github.com/carsdotcom/di-websites-platform/actions/runs/*
```

To use on different repositories, modify the `@match` directive in the userscript header.
