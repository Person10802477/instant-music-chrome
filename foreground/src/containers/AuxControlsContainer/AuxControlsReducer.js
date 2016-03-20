import { CONSTANTS } from "./constants";

export function isShuffle(state = false, action) {
  switch (action.type) {
    case CONSTANTS.TOGGLE_SHUFFLE:
      return !state;
    default:
      return state;
  }
}

export function isRepeat(state = false, action) {
  switch (action.type) {
    case CONSTANTS.TOGGLE_REPEAT:
      return !state;
    default:
      return state;
  }
}
