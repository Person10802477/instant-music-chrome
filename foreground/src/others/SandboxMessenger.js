import { updateCurrentSongAndPlayIt, playNextSong } from "../containers/PlaylistContainer/PlaylistActions";
import { togglePlaying, togglePaused } from "../containers/ControlsContainer/ControlsActions";

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

    chrome.runtime.onMessage.addListener(this.messageHandler);
  }

  sendMessage(msg) {
    if (this.webview.contentWindow) {
      this.webview.contentWindow.postMessage(msg, "*");  
    }
  }

  // FIXME: handle other cases
  messageHandler(msg) {
    switch (msg.data) {
      case PLAYER_STATES.ENDED:
      case PLAYER_STATES.ERROR:
        this.store.dispatch(togglePaused());
        this.store.dispatch(playNextSong());
        break;
      case PLAYER_STATES.PLAYING:
        this.store.dispatch(togglePlaying());
        break;
      case PLAYER_STATES.PAUSED:
        this.store.dispatch(togglePaused());
        break;
      default:
        // pass
        break;
    }
  }
}

export default SandboxMessenger;
