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
  console.log("START: ", videoUrl);
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

$(function() {
  console.log("HELLO!");
  window.webview = $("#youtube-webview")[0];
  resizeWebview(webview);

  // check develoment environment
  if (chrome.runtime.id) {
    chrome.runtime.onMessage.addListener(function(msg) {
      console.log(msg);
    })
  }
});


  //   searchMelon(CHART_URL, function(songsData) {
  //     var songsData = songsData.melon.songs.song;
  //     getVideoIdsFromYoutube(songsData, function(videoIds) {
  //       _.each(videoIds, function(videoId) {
  //         $(".videos").append("<div class='play-video' id='"+videoId+"'>"+videoId+"</div>");
  //       });

  //       $('.play-video').click(function(event) {
  //         sendMsg(youtubeWebview, {videoId: event.target.id});
  //       });
  //     })
  //   });
  // });




