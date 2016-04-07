import { CONSTANTS } from "./constants";

export function songNotifications(state = {"liked": 0}, action) {
  switch (action.type) {
    case CONSTANTS.CLEAR_SONG_NOTIFICATIONS:
      var notis = $.extend(true, {}, state);
      notis[action.playlistName] = 0;
      return notis;
    case CONSTANTS.ADD_SONG_NOTIFICATION:
      var notis = $.extend(true, {}, state);
      if (notis[action.playlistName]) {
        notis[action.playlistName] += 1;
      } else {
        notis[action.playlistName] = 1;
      }
      return notis;
    default:
      return state;
  }
}
