import { CONSTANTS } from "./constants";

function isPlaying(status = false, action) {
  switch (action.type) {
    case CONSTANTS.TOGGLE_PLAYING:
      return !status;
    default:
      return false;
  }
}

export { isPlaying }
