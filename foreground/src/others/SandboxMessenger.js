class SandboxMessenger {
  constructor(store, webview) {
    this.webview = webview;
    this.store = store;

    // Webview is available only inside Chrome app environment
    if (chrome.runtime.id) {
      // this.webview.contentWindow.addEventListener("message", messageHandler, false);  
      chrome.runtime.onMessage.addListener(messageHandler);
    }

    // chrome.runtime.onMessage.addListener(function(msg) {
    //   console.log(msg);
    // })

  }

  sendMsg(msg) {
    console.log("SANDBOX -> webview:", msg);
    this.webview.contentWindow.postMessage(msg, "*");
  }

  messageHandler(msg) {
    console.log("SANDBOX got:", msg);
    
    // store.dispatch(msg);
    console.log("SANDBOX dispatches:", msg);
  }
}

export default SandboxMessenger;
