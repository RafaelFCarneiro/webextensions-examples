
// /*
// On startup, connect to the "ping_pong" app.
// */
// var port = browser.runtime.connectNative("ping_pong");

// /*
// Listen for messages from the app.
// */
// port.onMessage.addListener((response) => {
//   console.log("Received: " + response);
// });

// /*
// On a click on the browser action, send the app a message.
// */
// browser.browserAction.onClicked.addListener(() => {
//   console.log("Sending:  ping");
//   port.postMessage("ping");
// });


browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) { 
  console.info("Received %o from %o, frame", msg, sender.tab, sender.frameId);
  var port = browser.runtime.connectNative("ping_pong");

  // Send message to native application.
  port.postMessage(msg);

  // Listen for response...
  port.onMessage.addListener(function (msg) {
      // Send data to the content.
      browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          browser.tabs.sendMessage(tabs[0].id, msg, function (response) { });
      });

      sendResponse({response: msg});
  });

  port.onDisconnect.addListener(function () {
      console.info("Disconnected.");
  });
}); 


/*
Listen for messages from the app.
*/

// browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   var port = browser.runtime.connectNative("ping_pong");

//   console.log(request)
//   console.log(sender);  
//   console.log(sendResponse); 
  
//   // Send message to native application.
//   port.postMessage('ping')
  
//   port.onMessage.addListener((response) => {
//     console.log("Received: " + response);
//     sendResponse({response: request.message})
//   });  
// });