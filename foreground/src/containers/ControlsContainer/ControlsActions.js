import { CONSTANTS } from './constants';

// NOTE: this only changes the state of isPlaying without actually
// telling the player to play/pause the song
export function togglePlayingState() {
  return {
    type: CONSTANTS.TOGGLE_PLAYING
  }
}

export function togglePlayPause() {
  return (dispatch) => {
    window.app.sandboxMessenger.sendMessage({
      type: CONSTANTS.TOGGLE_PLAY_PAUSE
    });

    dispatch(togglePlayingState());
  }
}
