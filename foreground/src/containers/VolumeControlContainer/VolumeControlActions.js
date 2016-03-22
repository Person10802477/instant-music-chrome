import { CONSTANTS as SANDBOX_CONSTANTS } from '../../others/constants';

function _setVolume(volume) {
  return {
    type: SANDBOX_CONSTANTS.SET_VOLUME,
    volume: volume
  }
}

export function setVolume(volume) {
  return (dispatch, getState) => {
    // Tell YouTube to change the player's volume
    window.IM.sandboxMessenger.sendMessage({
      type: SANDBOX_CONSTANTS.SET_VOLUME,
      volume: volume
    });

    dispatch(_setVolume(volume));
  }
}
