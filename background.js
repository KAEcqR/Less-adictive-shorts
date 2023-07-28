// background.js

// Initialize the count when the extension is first installed or loaded
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ shortVideoCount: 0 });
});

// Update the count in local storage when a short video is played
function incrementCounter() {
  chrome.storage.local.get('shortVideoCount', (data) => {
    const count = data.shortVideoCount || 0;
    chrome.storage.local.set({ shortVideoCount: count + 1 });
  });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "videoWatched") {
    incrementCounter();
    
    // Send a response to the content script to acknowledge the message
    return true;
  }
});
