// popup.js

// Function to update the counter in the popup
function updateCounter(count) {
  document.getElementById('counter').textContent = `Shorts Watched: ${count}`;
}

// Function to display the list of watched times
function displayWatchedTimes(times) {
  const ulElement = document.getElementById("myList");
  ulElement.innerHTML = ""; // Clear existing items

  times.forEach((time) => {
    const newListItem = document.createElement("li");
    newListItem.textContent = time;
    ulElement.appendChild(newListItem);
  });
}

// Get the count and watchedTimes from local storage and display them on the popup page
function updateDisplay() {
  chrome.storage.local.get(['shortVideoCount', 'watchedTimes'], (data) => {
    const count = data.shortVideoCount || 0;
    const times = data.watchedTimes || [];
    updateCounter(count);
    displayWatchedTimes(times);
  });
}

// Reload button click event handler
function handleReloadButtonClick() {
  // Reset the counter in the local storage to 0

  chrome.storage.local.set({ shortVideoCount: 0, watchedTimes:[] }, () => {
    // After resetting, update the counter display in the popup
    updateDisplay();
  });

}

// Set up event listener for the reload button after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reloadButton').addEventListener('click', handleReloadButtonClick);

  // Initialize the counter display when the popup is opened
  updateDisplay();
});

// Append item to list

function appendListItem(content) {
  const ulElement = document.getElementById("myList");
  if (ulElement) {
    const newListItem = document.createElement("li");
    newListItem.textContent = content; 
    ulElement.appendChild(newListItem);
  }
}

// Call the function to append a new list item when needed (for example, when a button is clicked)
appendListItem();

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "videoWatched") {
    updateDisplay();

    // Add date to list 
    const currentDate = new Date()
    const Time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

    appendListItem(Time);
    return true;
  }
});

// Set up event listener for the reload button after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reloadButton').addEventListener('click', handleReloadButtonClick);

  // Initialize the counter display and load/draw the chart when the popup is opened
  updateDisplay();
  loadAndDrawChart([]); // Load and draw an empty chart initially
});

// Function to update the counter and redraw the chart in the popup
function updateCounterAndChart(count, times) {
  updateCounter(count);
  displayWatchedTimes(times);
  loadAndDrawChart(times);
}

// ... (existing code)

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateCounterAndChart") {
    const { count, times } = message;
    updateCounterAndChart(count, times);
    return true;
  }
});