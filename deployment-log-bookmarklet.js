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
    const clipText = await navigator.clipboard.readText();
    return clipText.trim();
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
      const htmlMessage = `<meta charset="utf-8"><b style="font-weight:normal;" id="docs-internal-guid-ab2a93a8-7fff-d408-d635-cc6fdba8b249"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">${time} </span><a href="mailto:jpuckett@dealerinspire.com" style="text-decoration:none;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-rich-links="{&quot;per_n&quot;:&quot;Jeff Puckett&quot;,&quot;per_e&quot;:&quot;jpuckett@dealerinspire.com&quot;,&quot;type&quot;:&quot;person&quot;}">Jeff Puckett</span></a><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"> started </span><a href="${url}" style="text-decoration:none;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">deployment</span></a></b>`;

      // Copy to clipboard
      const clipboardItem = new ClipboardItem({
        'text/plain': new Blob([logMessage], { type: 'text/plain' }),
        'text/html': new Blob([htmlMessage], { type: 'text/html' })
      });
      await navigator.clipboard.write([clipboardItem]);
      showSuccessToast('✅ Deployment log copied to clipboard!');

    } catch (error) {
      alert('Error generating deployment log: ' + error.message);
    }
  }

  generateDeploymentLog();
})();
