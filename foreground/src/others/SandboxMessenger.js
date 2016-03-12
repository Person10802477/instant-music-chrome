import { updateCurrentSongAndPlayIt } from "../containers/PlaylistContainer/PlaylistActions";

const PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5,
  ERROR: 6
};

class SandboxMessenger {
  constructor(store, webview) {
    if (!chrome.runtime.id) {
      return false;
    }

    this.webview = webview;
    this.store = store;

    this.sendMessage = this.sendMessage.bind(this);
    this.messageHandler = this.messageHandler.bind(this);
    this.getNextSong = this.getNextSong.bind(this);

    chrome.runtime.onMessage.addListener(this.messageHandler);
  }

  sendMessage(msg) {
    if (this.webview.contentWindow) {
      this.webview.contentWindow.postMessage(msg, "*");  
    }
  }

  getNextSong(currentSong, currentPlaylist) {
    var idx = _.findIndex(currentPlaylist.songs, (song) =>
      (song.videoId === currentSong.videoId));
    var nextIdx = (idx === currentPlaylist.songs.length-1) ? 0 : idx+1;
    return currentPlaylist.songs[nextIdx];
  }

  // FIXME: handle other cases
  messageHandler(msg) {
    switch (msg.data) {
      case PLAYER_STATES.ENDED:
      case PLAYER_STATES.ERROR:
        var state = this.store.getState();
        var nextSong = this.getNextSong(state.currentSong, state.currentPlaylist);
        this.store.dispatch(updateCurrentSongAndPlayIt(nextSong));
        break;
      case PLAYER_STATES.PLAYING:
        console.log("playing");
        break;
      case PLAYER_STATES.PAUSED:
        console.log("paused");
        break;
      default:
        debugger
        // pass
        break;
    }
  }
}

export default SandboxMessenger;
