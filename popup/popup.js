// popup.js

// Function to update the counter in the popup
function updateCounter(count) {
  document.getElementById('counter').textContent = `Shorts Watched: ${count}`;
}

// Get the count from local storage and display it on the popup page
function updateDisplay() {
  chrome.storage.local.get('shortVideoCount', (data) => {
    const count = data.shortVideoCount || 0;
    updateCounter(count);
  });
}

// Reload button click event handler
function handleReloadButtonClick() {
  // Reset the counter in the local storage to 0

  chrome.storage.local.set({ shortVideoCount: 0 }, () => {
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

  function appendListItem(content) {
    const ulElement = document.getElementById("myList");
    console.log(ulElement)
    if (ulElement) {
      const newListItem = document.createElement("li");
      newListItem.textContent = content; // You can set the text content of the new list item here
      ulElement.appendChild(newListItem);
    }
  }
  
  // Call the function to append a new list item when needed (for example, when a button is clicked)
  appendListItem();

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "videoWatched") {
    updateDisplay();
    const currentDate = new Date()
    appendListItem(currentDate);
    return true;
  }
});
