var APP_ID = chrome.runtime.id;

var CONSTANTS = {
  LOAD_VIDEO: 'LOAD_VIDEO',
  CUE_VIDEO: 'CUE_VIDEO',
  TOGGLE_PLAY_PAUSE: 'TOGGLE_PLAY_PAUSE',
  ERROR_CODE: 6,
  PLAYER_READY: 'PLAYER_READY'
};

var messageHandler = function(rawMsg) {
  var msg = rawMsg.data;

  switch (msg.type) {
    case CONSTANTS.LOAD_VIDEO:
      player.loadVideoById(msg.videoId);
      break;
    case CONSTANTS.CUE_VIDEO:
      player.cueVideoById(msg.videoId);
      break;
    case CONSTANTS.TOGGLE_PLAY_PAUSE:
      var playerState = player.getPlayerState();
      if (playerState === YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
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
      videoId: 'XyzaMpAVm3s',
      origin: "chrome-extension://" + chrome.runtime.id,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      },
      autohide: 0 // FIXME: how come this potion doesn't work?
    });
  }

  window.onPlayerReady = function(event) {
    chrome.runtime.sendMessage(APP_ID, {data: CONSTANTS.PLAYER_READY});
  }

  window.onPlayerStateChange = function(event) {
    chrome.runtime.sendMessage(APP_ID, event);
  }

  window.onPlayerError = function(event) {
    chrome.runtime.sendMessage(APP_ID, {data: CONSTANTS.ERROR_CODE});
  }
}

var loadYouTubeAsync = function() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

document.addEventListener("DOMContentLoaded", function(event) {
  registerYouTubeEvents();
  loadYouTubeAsync();
  window.addEventListener("message", messageHandler, false);
});
