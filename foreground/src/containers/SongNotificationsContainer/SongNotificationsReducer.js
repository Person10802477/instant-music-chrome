import { CONSTANTS } from "./constants";

export function numSongNotifications(state = 0, action) {
  switch (action.type) {
    case CONSTANTS.CLEAR_SONG_NOTIFICATIONS:
      return 0;
    case CONSTANTS.ADD_SONG_NOTIFICATION:
      return state + 1;
    default:
      return state;
  }
}
