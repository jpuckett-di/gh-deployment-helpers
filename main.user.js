// ==UserScript==
// @name Deployment Log Helpers
// @namespace Violentmonkey Scripts
// @match https://github.com/carsdotcom/di-websites-platform/actions/runs/*
// @grant none
// @author Jeff Puckett
// @version 0.2.1
// @description Helper scripts for creating deployment logs
// @homepageURL https://github.com/jpuckett-di/gh-deployment-helpers
// @downloadURL https://raw.githubusercontent.com/jpuckett-di/gh-deployment-helpers/refs/heads/main/main.user.js
// ==/UserScript==
function showSuccessToast(message) {
  const toast = document.createElement("div");
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
  const style = document.createElement("style");
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
    toast.style.animation = "slideInRight 0.3s ease-out reverse";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
      if (style.parentNode) style.parentNode.removeChild(style);
    }, 300);
  }, 3000);
}

function getCurrentUrl() {
  return window.location.href;
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Chicago",
  });
}

async function generateDeploymentLog() {
  try {
    const time = getCurrentTime();
    const url = getCurrentUrl();

    const htmlMessage = `<meta charset="utf-8"><b style="font-weight:normal;" id="docs-internal-guid-ab2a93a8-7fff-d408-d635-cc6fdba8b249"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">${time} </span><a href="mailto:jpuckett@dealerinspire.com" style="text-decoration:none;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-rich-links="{&quot;per_n&quot;:&quot;Jeff Puckett&quot;,&quot;per_e&quot;:&quot;jpuckett@dealerinspire.com&quot;,&quot;type&quot;:&quot;person&quot;}">Jeff Puckett</span></a><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"> started </span><a href="${url}" style="text-decoration:none;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">deployment</span></a></b>`;

    // Copy to clipboard
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([url], { type: "text/plain" }),
      "text/html": new Blob([htmlMessage], { type: "text/html" }),
    });
    await navigator.clipboard.write([clipboardItem]);
    showSuccessToast("✅ Deployment log copied to clipboard!");
  } catch (error) {
    alert("Error generating deployment log: " + error.message);
  }
}

function createDeploymentLogButton() {
  // Add CSS for hover effect
  const style = document.createElement("style");
  style.textContent = `
    .deployment-log-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background: #2ea043;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      z-index: 10000;
      transition: background-color 0.2s ease, box-shadow 0.1s ease, transform 0.1s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .deployment-log-button:hover {
      background: #2c974b;
    }
    .deployment-log-button:active {
      background: #238636;
      box-shadow: 0 0 1px rgba(0,0,0,0.2);
      transform: translateY(1px);
    }
    .deployment-log-close {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 18px;
      height: 18px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }
    .deployment-log-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement("button");
  button.className = "deployment-log-button";

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.className = "deployment-log-close";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering the main button
    button.remove();
  });

  // Create text span
  const textSpan = document.createElement("span");
  textSpan.textContent = "Copy URL Log";

  // Add elements to button
  button.appendChild(closeBtn);
  button.appendChild(textSpan);

  button.addEventListener("click", (e) => {
    // Only trigger if not clicking the close button
    if (e.target !== closeBtn) {
      generateDeploymentLog();
    }
  });

  document.body.appendChild(button);
}

// Wait for the page to load, then create the button
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createDeploymentLogButton);
} else {
  createDeploymentLogButton();
}
