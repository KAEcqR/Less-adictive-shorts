// background.js

// Initialize the count and times when the extension is first installed or loaded
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ shortVideoCount: 0, watchedTimes: [] });
});

// Update the count and times in local storage when a short video is played
function incrementCounterAndTimes(time) {
  chrome.storage.local.get(['shortVideoCount', 'watchedTimes'], (data) => {
    const count = data.shortVideoCount || 0;
    const times = data.watchedTimes || [];
    chrome.storage.local.set({ shortVideoCount: count + 1, watchedTimes: [...times, time] });
  });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "videoWatched") {
    incrementCounterAndTimes(message.time);
    // Send a response to the content script to acknowledge the message
    return true;
  }
});