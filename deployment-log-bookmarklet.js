javascript:(function(){
  async function getClipboardUrl() {
    try {
      // Try to read from clipboard using modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clipText = await navigator.clipboard.readText();
        return clipText.trim();
      }
    } catch (err) {
      console.log('Clipboard access failed:', err);
    }

    // Fallback: prompt user to paste URL
    return prompt('Paste the URL from your clipboard:');
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  async function generateDeploymentLog() {
    try {
      const time = getCurrentTime();
      const url = await getClipboardUrl();

      if (!url) {
        alert('No URL provided. Cancelling.');
        return;
      }

      const logMessage = `${time} Jeff Puckett started [deployment](${url})`;

      // Try to copy to clipboard
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(logMessage);
          alert('Deployment log copied to clipboard!\n\n' + logMessage);
        } else {
          // Fallback: show in prompt for manual copy
          prompt('Copy this deployment log message:', logMessage);
        }
      } catch (err) {
        // Fallback: show in prompt for manual copy
        prompt('Copy this deployment log message:', logMessage);
      }

    } catch (error) {
      alert('Error generating deployment log: ' + error.message);
    }
  }

  generateDeploymentLog();
})();
