import { updateCurrentSongAndPlayIt, playNextSong, playPrevSong } from "../containers/PlaylistContainer/PlaylistActions";
import { togglePlayPause, togglePlayingState } from "../containers/ControlsContainer/ControlsActions";
import { COMMANDS, PLAYER_STATES, CONSTANTS } from "./constants";

class SandboxMessenger {
  constructor(store, webview) {
    if (!chrome.runtime.id) {
      return false;
    }

    this.webview = webview;
    this.store = store;

    this.sendMessage = this.sendMessage.bind(this);
    this.messageHandler = this.messageHandler.bind(this);
    this.commandHandler = this.commandHandler.bind(this);

    if (chrome.runtime.id) {
      chrome.runtime.onMessage.addListener(this.messageHandler);
      chrome.commands.onCommand.addListener(this.commandHandler);
    }
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
        this.store.dispatch(playNextSong());
        break;
      case PLAYER_STATES.PLAYING:
        // Synchronize only when necessary
        if (!this.store.getState().isPlaying) {
          this.store.dispatch(togglePlayingState());
        }
        break;
      case PLAYER_STATES.PAUSED:
        // Synchronize only when necessary
        if (this.store.getState().isPlaying) {
          this.store.dispatch(togglePlayingState());
        }
        break;
      case PLAYER_STATES.PLAYER_READY:
        var currentSong = this.store.getState().currentSong;
        window.app.sandboxMessenger.sendMessage({
          type: CONSTANTS.CUE_VIDEO,
          videoId: currentSong.videoId
        });
        $(window.webview).show();
        break;
      default:
        // pass
        break;
    }
  }

  commandHandler(command) {
    switch(command) {
      case COMMANDS.TOGGLE_PLAY_PAUSE:
        this.store.dispatch(togglePlayPause());
        break;
      case COMMANDS.PLAY_PREV_SONG:
        this.store.dispatch(playPrevSong());
        break;
      case COMMANDS.PLAY_NEXT_SONG:
        this.store.dispatch(playNextSong());
        break;
      default:
        break;
    }
  }
}

export default SandboxMessenger;
