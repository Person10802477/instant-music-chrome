var resizeWebview = function(webview) {
  webview.style.width = "300px";
  webview.style.height = "200px";
}

// Attach the necessary headers to play YouTube videos in a Chrome App
var setHttpReferer = function(webview) {
  if (!chrome.runtime.id) {
    return false;
  }

  var filter = {
    urls: ['*://*.youtube.com/embed/*' + chrome.runtime.id]
    // urls: ['*://*.youtube.com/embed/*']
  };
  var optParam = ['blocking', 'requestHeaders'];

  webview.request.onBeforeSendHeaders.addListener(function (req) {
    var customurl = req.url.substring(0, req.url.indexOf('/embed/'));
    var customRefererObject = { name: 'Referer', value: customurl };

    $.grep(req.requestHeaders, function (headers) {
      if (headers.name == 'Referer') {
        headers.value = customurl;
      }
    });
    
    req.requestHeaders.push(customRefererObject);

    return { requestHeaders: req.requestHeaders };

  }, filter, optParam);
}

$(function() {
  window.webview = $("#youtube-webview")[0];
  resizeWebview(webview);
  setHttpReferer(webview);

});
