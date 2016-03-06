var CONSTANTS = {
  LOAD_VIDEO: 'LOAD_VIDEO',
  PAUSE_VIDEO: 'PAUSE_VIEO',
};

var messageHandler = function(msg) {
  switch (msg.type) {
    case CONSTANTS.LOAD_VIDEO:
      player.loadVideoById(msg.videoId);
      break;
    case CONSTANTS.PAUSE_VIDEO:
      player.stopVideo());
      break;
    default
      break;
  }
}

var sendMessage = function(msg) {
  chrome.runtime.sendMessage(APP_ID, msg);
}

var registerYouTubeEvents() {
  window.onYouTubeIframeAPIReady = function() {
    window.player = new YT.Player('player', {
      width: '300',
      height: '200',
      videoId: '1TJQ6s1N1v0',
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

$(function() {
  registerYouTubeEvents();


});
