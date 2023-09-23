// content.js

// Function to check if the video is a short
function isShortVideo() {
  // Check if the URL contains "/shorts/"
  return window.location.href.includes("/shorts/");
}

// Send a message to the background script with the current time when a video is watched
function sendMessageToBackground(time) {
  if (isShortVideo()) {
    chrome.runtime.sendMessage({ action: "videoWatched", time });
  }
}

// Listen for video play events
document.addEventListener('play', () => {
  if (isShortVideo()) {
    const currentTime = new Date().toLocaleTimeString();
    sendMessageToBackground(currentTime);

  }
}, true);


// Make grayscale default

// document.querySelector("#shorts-player").classList.add("grayscale")
