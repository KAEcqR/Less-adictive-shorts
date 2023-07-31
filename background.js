// background.js

// Initialize the count and times when the extension is first installed or loaded
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ shortVideoCount: 0, watchedTimes: [] });
  chrome.runtime.sendMessage({ action: "SetOverlay" });
});

// Function to update the counter and redraw the chart
function updateCounterAndChart() {
  chrome.storage.local.get(['shortVideoCount', 'watchedTimes'], (data) => {
    const count = data.shortVideoCount || 0;
    const times = data.watchedTimes || [];

    // Send message to popup.js to update counter and redraw chart
    chrome.runtime.sendMessage({ action: "updateCounterAndChart", count, times });
    chrome.runtime.sendMessage({ action: "SetOverlay", count });
  });
}

// Update the count and times in local storage when a short video is played
function incrementCounterAndTimes(time) {
  chrome.storage.local.get(['shortVideoCount', 'watchedTimes'], (data) => {
    const count = data.shortVideoCount || 0;
    const times = data.watchedTimes || [];
    chrome.storage.local.set({ shortVideoCount: count + 1, watchedTimes: [...times, time] });

    // Update the counter and redraw the chart
    updateCounterAndChart();
  });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "videoWatched") {
    incrementCounterAndTimes(message.time);
    updateCounterAndChart();
    // Send a response to the content script to acknowledge the message
    return true;
  }
});
