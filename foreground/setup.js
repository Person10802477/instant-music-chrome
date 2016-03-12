var registerEvents = function(webview) {
  webview.addEventListener('loadstart', function() {
    console.log("load started");
  });

  webview.addEventListener('loadstop', function() {
    console.log("load stopped");
  });

  webview.addEventListener('contentload', function() {
    console.log("contentload");
  });

  webview.addEventListener('dialog', function() {
    console.log("dialog");
  });

  webview.addEventListener('findupdate', function() {
    console.log("findupdate");
  });

  webview.addEventListener('loadredirect', function() {
    console.log("loadredirect");
  });
  
  webview.addEventListener('newwindow', function() {
    console.log("newwindow");
  });

  webview.addEventListener('permissionrequest', function() {
    console.log("permissionrequest");
  });
}

var playInSeries = function(webview, videoIds) {
  var currentIdx = 0;
  var videoUrl = "http://www.youtube.com/embed/" + videoIds[currentIdx] + "?enablejsapi=1&autoplay=1";
  webview.src = videoUrl;
}

var messageHandler = function(msg) {
  console.log(msg);
}

var sendMsg = function(webview, msg) {
  webview.contentWindow.postMessage(msg, "*");
};

var resizeWebview = function(webview) {
  webview.style.width = "300px";
  webview.style.height = "200px";
}

// webview.request.onBeforeRequest.addListener(
//   function(details) { return {cancel: true}; },
//   {urls: ["*://www.evil.com/*"]},
//   ["blocking"]);

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
    var isRefererPresent;

    console.log("BEFORE REQ", req);

    $.grep(req.requestHeaders, function (headers) {
      if (headers.name == 'Referer') {
        headers.value = customurl;
      }
    });
    if (!isRefererPresent) {
      req.requestHeaders.push(customRefererObject);
    }

    console.log("AFTER REQ", req);
    return { requestHeaders: req.requestHeaders };
  }, filter, optParam);
}

// setUserAgentOverride

$(function() {
  window.webview = $("#youtube-webview")[0];
  resizeWebview(webview);
  setHttpReferer(webview);


  // check develoment environment
  if (chrome.runtime.id) {
    chrome.runtime.onMessage.addListener(function(msg) {
      console.log(msg);
    })
  }
});
