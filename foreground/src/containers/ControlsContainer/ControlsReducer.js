import { CONSTANTS } from "./constants";

function isPlaying(status = false, action) {
  console.log(action);

  switch (action.type) {
    case CONSTANTS.TOGGLE_PLAYING:
      return true;
    case CONSTANTS.TOGGLE_PAUSED:
      return false;
    default:
      return false;
  }
}

export { isPlaying }
