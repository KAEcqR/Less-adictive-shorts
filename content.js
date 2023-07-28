// content.js

// Function to check if the video is a short
function isShortVideo() {
  // Check if the URL contains "/shorts/"
  return window.location.href.includes("/shorts/");
}

// Send a message to the background script when a video is watched
function sendMessageToBackground() {
  if (isShortVideo()) {
    chrome.runtime.sendMessage({ action: "videoWatched" });
  }
}

// Listen for video play events
document.addEventListener('play', sendMessageToBackground, true);
