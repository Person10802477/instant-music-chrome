import { CONSTANTS } from "./constants";

function isPlaying(state = false, action) {
  switch (action.type) {
    case CONSTANTS.TOGGLE_PLAYING:
      return !state;
    default:
      return state;
  }
}

export { isPlaying }
