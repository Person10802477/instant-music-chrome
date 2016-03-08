var APP_ID = chrome.runtime.id;

var CONSTANTS = {
  LOAD_VIDEO: 'LOAD_VIDEO',
  PAUSE_VIDEO: 'PAUSE_VIEO',
};

var messageHandler = function(rawMsg) {
  var msg = rawMsg.data;

  switch (msg.type) {
    case CONSTANTS.LOAD_VIDEO:
      player.loadVideoById(msg.videoId);
      break;
    case CONSTANTS.PAUSE_VIDEO:
      player.stopVideo();
      break;
    default:
      break;
  }
}

var sendMessage = function(msg) {
  chrome.runtime.sendMessage(APP_ID, msg);
}

var registerYouTubeEvents = function() {
  window.onYouTubeIframeAPIReady = function() {
    window.player = new YT.Player('player', {
      width: '300',
      height: '200',
      videoId: '1TJQ6s1N1v0',
      origin: "chrome-extension://" + chrome.runtime.id,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  window.onPlayerReady = function(event) {
    // event.target.playVideo();
  }

  window.onPlayerStateChange = function(event) {
    chrome.runtime.sendMessage(APP_ID, event);
  }
}

var loadYouTubeAsync = function() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  registerYouTubeEvents();
  loadYouTubeAsync();
  window.addEventListener("message", messageHandler, false);
});
