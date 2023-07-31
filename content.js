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



    // overlay();
  }
}, true);

//todo DO ZROBIENIA : OVERLAY 

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.action === "SetOverlay") {
//     overlay('<h1>Wiadomosc</h1>')

//     // Send a response to the content script to acknowledge the message
//     return true;
//   }
// });

// const overlay = function(content){
//   if(document.querySelector(".myOverlay")){
//     const lastOverlay = document.querySelector(".myOverlay");
//     lastOverlay.remove();
//   };

//   const injectElement = document.createElement('div');
//   injectElement.className = 'myOverlay';
//   injectElement.innerHTML = `${content}`;
//   document.body.appendChild(injectElement);
// }
