class SandboxMessenger {
  constructor(webview) {
    this.webview = webview;
  }

  sendMsg(msg) {
    this.webview.contentWindow.postMessage(msg, "*");  
  }

  messageHandler(msg) {
    dispatch(msg)
  }
}
