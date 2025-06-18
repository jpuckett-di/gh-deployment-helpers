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
   - Try to read the URL from your clipboard automatically
   - If clipboard access fails, it will prompt you to paste the URL
   - Generate a timestamp in MM/DD/YYYY, HH:MM:SS format
   - Create the deployment log message
   - Copy the result to your clipboard (or show it in a prompt for manual copying)

## Example Output

```
12/20/2024, 14:30:15 Jeff Puckett started [deployment](https://github.com/user/repo/pull/123)
```

## Browser Compatibility

- **Modern browsers**: Will automatically read from clipboard and copy result to clipboard
- **Older browsers or restricted contexts**: Will prompt for URL input and show result in a dialog for manual copying

## Files

- `deployment-log-bookmarklet.js` - Readable, formatted version of the code
- `deployment-log-bookmarklet-minified.js` - Minified version ready for use as a bookmark
