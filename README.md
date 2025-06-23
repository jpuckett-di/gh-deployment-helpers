# Deployment Log Helper - Userscript

This userscript automatically adds buttons to GitHub Actions pages and Google Docs. On GitHub Actions pages, it copies deployment logs to clipboard. On Google Docs, it inserts deployment success text at the cursor position.

## Features

- 🔘 **Adaptive button** - Adds context-appropriate buttons to supported pages
  - **GitHub Actions**: "Copy URL Log" button for clipboard operations
  - **Google Docs**: "Declare Success" button for text insertion
- 📋 **Dual clipboard formats** - Copies current page URL as plain text + rich HTML deployment log simultaneously (GitHub only)
- ✏️ **Success text to clipboard** - Copies timestamped success message for manual pasting (Google Docs only)
- 🕒 **Auto timestamp** - Generates timestamp in 12-hour format with AM/PM (Central Time)
- 🌐 **Current page URL** - Uses the current GitHub Actions page URL automatically
- ❌ **Removable** - Click the × to remove the button if not needed
- ✅ **Success feedback** - Shows a green toast notification

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

### GitHub Actions Pages

1. Navigate to any GitHub Actions run page matching these patterns:

   - `https://github.com/carsdotcom/di-websites-platform/actions/runs/*`
   - `https://github.com/carsdotcom/di-playwright-automation/actions/runs/*`

2. You'll see a green "Copy URL Log" button in the top-left corner with an × close button:
   **[×] Copy URL Log**

3. Click the button to:

   - Copy the current page URL as plain text
   - Copy a timestamped deployment log message as rich HTML
   - Show a success notification

### Google Docs

1. Navigate to the deployment log document:
   `https://docs.google.com/document/d/1fzr51RGomgIRwenb-rOv6AHxeDVvDHXHmree6HUW0xM/*`

2. You'll see a green "Declare Success" button in the top-left corner with an × close button:
   **[×] Declare Success**

3. Click the button to:

   - Copy "{time} deployment declared successfully" to your clipboard
   - Show a success notification

4. Manually paste (Ctrl+V or Cmd+V) at your desired location in the document

### General

4. Click the × to remove the button if you don't need it

## Example Output

### GitHub Actions Pages

**Plain Text:**

```
https://github.com/carsdotcom/di-websites-platform/actions/runs/12345
```

**Rich HTML:**

_For di-websites-platform:_
_Formatted as: `5:26 AM Jeff Puckett started <a href="url">deployment</a>`_

_For di-playwright-automation:_
_Formatted as: `5:26 AM deployment completed and <a href="url">test suite</a> started`_

- Time and text with Arial 11pt styling
- "Jeff Puckett" as clickable email link with rich person metadata (websites-platform only)
- Link text changes based on repository ("deployment" vs "test suite")

### Google Docs

**Copied Text:**

```
5:26 AM deployment declared successfully
```

- Text is copied to clipboard for manual pasting in the document

## Browser Requirements

- **Modern browsers**: Requires support for the Clipboard API (`navigator.clipboard`)
- Supports Chrome 76+, Firefox 63+, Safari 13.1+, Edge 79+
- Must allow clipboard access (you may see a permission prompt on first use)
- Requires a userscript manager (Violentmonkey, Tampermonkey, etc.)

## Files

- `main.user.js` - The complete userscript ready for installation

## URL Pattern

The script activates on the following pages:

**GitHub Actions:**

```
https://github.com/carsdotcom/di-websites-platform/actions/runs/*
https://github.com/carsdotcom/di-playwright-automation/actions/runs/*
```

**Google Docs:**

```
https://docs.google.com/document/d/1fzr51RGomgIRwenb-rOv6AHxeDVvDHXHmree6HUW0xM/*
```

### Message Formats

**GitHub Actions** (copied to clipboard):

- **di-websites-platform**: `{time} Jeff Puckett started [deployment]({url})`
- **di-playwright-automation**: `{time} deployment completed and [test suite]({url}) started`

**Google Docs** (copied to clipboard):

- **deployment log**: `{time} deployment declared successfully`

To use on different pages, modify the `@match` directives in the userscript header.
