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
    // urls: ['*://*.youtube.com/embed/*' + chrome.runtime.id]
    urls: ['*://*.youtube.com/embed/*']
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

// var startSpinner = function() {
//   var target = this.refs.playlistLoading;
//   var spinner = new Spinner({
//     lines: 10, // The number of lines to draw
//     length: 0, // The length of each line
//     width: 6, // The line thickness
//     radius: 30, // The radius of the inner circle
//     scale: 1.5  , // Scales overall size of the spinner
//     color: '#fff', // #rgb or #rrggbb or array of colors
//     speed: 1.3, // Rounds per second
//     className: 'spinner', // The CSS class to assign to the spinner
//     top: '50%', // Top position relative to parent
//     left: '50%', // Left position relative to parent
//     position: 'absolute', // Element positioning
//   }).spin(target);
// }

$(function() {
  window.webview = $("#youtube-webview")[0];
  resizeWebview(webview);
  setHttpReferer(webview);



// loading

});
