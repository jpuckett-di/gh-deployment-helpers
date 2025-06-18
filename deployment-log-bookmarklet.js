javascript:(function(){
  function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;

    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease-out reverse';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
        if (style.parentNode) style.parentNode.removeChild(style);
      }, 300);
    }, 3000);
  }

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
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Chicago'
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
          showSuccessToast('✅ Deployment log copied to clipboard!');
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
