import { CONSTANTS } from './constants';

export function togglePlaying() {
  return {
    type: CONSTANTS.TOGGLE_PLAYING
  }
}

export function togglePaused() {
  return {
    type: CONSTANTS.TOGGLE_PAUSED
  }
}

export function playSong() {
  return (dispatch) => {
    if (chrome.runtime.id) {
      window.app.sandboxMessenger.sendMessage({
        type: CONSTANTS.TOGGLE_PLAYING
      });
    }

    dispatch(togglePlaying());
  }
}

export function pauseSong() {
  return (dispatch) => {
    if (chrome.runtime.id) {
      window.app.sandboxMessenger.sendMessage({
        type: CONSTANTS.TOGGLE_PAUSED
      });
    }

    dispatch(togglePaused());
  }
}
