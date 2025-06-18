# Deployment Log Bookmarklet

This bookmarklet generates a deployment log message in the format: `{time} Jeff Puckett started [deployment]({url_from_clipboard})`

## How to Install

1. Copy the entire contents of `deployment-log-bookmarklet-minified.js`
2. Create a new bookmark in your browser
3. Set the bookmark name to something like "Deployment Log"
4. Paste the copied code as the bookmark URL
5. Save the bookmark

## How to Use

1. Copy a URL to your clipboard (the deployment URL you want to reference)
2. Click the bookmarklet from your bookmarks bar or menu
3. The bookmarklet will:
   - Read the URL from your clipboard automatically
   - Generate a timestamp in HH:MM format (Central Time)
   - Create the deployment log message in both plain text and rich HTML formats
   - Copy both formats to your clipboard simultaneously

## Example Output

**Plain Text:**
```
17:26 Jeff Puckett started [deployment](https://github.com/user/repo/pull/123)
```

**Rich HTML:**
- Time and text with Arial 11pt styling
- "Jeff Puckett" as clickable email link with rich metadata
- "deployment" as clickable link to your clipboard URL

## Browser Requirements

- **Modern browsers only**: Requires support for the modern Clipboard API (`navigator.clipboard`)
- Supports Chrome 76+, Firefox 63+, Safari 13.1+, Edge 79+
- Must allow clipboard access (you may see a permission prompt on first use)

## Files

- `deployment-log-bookmarklet.js` - Readable, formatted version of the code
- `deployment-log-bookmarklet-minified.js` - Minified version ready for use as a bookmark
