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


    overlay();
  }
}, true);


const overlay = function(content) {
  // Check if overlay is enabled

  if (document.querySelector(".myOverlay")) {
    const lastOverlay = document.querySelector(".myOverlay");
    lastOverlay.remove();
  }

  const injectElement = document.createElement('div');
  injectElement.className = 'myOverlay';
  injectElement.innerHTML = content;
  document.body.appendChild(injectElement);

}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "SetOverlay") {
    const overlayContent = `<p>Shorts Watched: ${message.count}<p>`;
    overlay(overlayContent);

    // Send a response to the background script to acknowledge the message
    return true;
  }
})

// Make grayscale default

document.querySelector("#shorts-player").classList.add("grayscale")

// Toggle grayscale

chrome.runtime.onMessage.addListener(function(request) {
  if(request.action === 'grayscale') {
      console.log(document.querySelector("#shorts-player"))
      document.querySelector("#shorts-player").classList.toggle("grayscale");
  }
});

// Toggle overlay

chrome.runtime.onMessage.addListener(function(request) {
  if(request.action === 'overlay') {
      console.log(document.querySelector(".myOverlay"))
      document.querySelector(".myOverlay").classList.toggle("disable");
  }
});