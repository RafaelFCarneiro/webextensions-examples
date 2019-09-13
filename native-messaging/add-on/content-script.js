document.addEventListener("send-message-event", (data) => {
  var request = data.detail.data;
  console.log("content script : ", request);
  // Send message to the background script
  browser.runtime.sendMessage("ping_pong@example.org", request)
    .then(
      (message) => console.log(`Message from the background script:  ${message.response}`), 
      (error) => console.log(`Error: ${error}`)
    );
});

/**
* Listens to the background script and dispatches 'get-message-event' 
* to the client when the data is received.
*/
browser.runtime.onMessage.addListener((response, sender, sendResponse) => {
  console.log(response);
  // Send response to the front page
  var event = new CustomEvent("get-message-event", {
      detail: {
          data: response
      },
      bubbles: true,
      cancelable: true
  });
  document.dispatchEvent(event);
});