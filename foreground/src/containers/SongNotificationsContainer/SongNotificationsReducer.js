import { CONSTANTS } from "./constants";
import { CONSTANTS as PLAYLIST_CONSTANTS } from "../PlaylistContainer/constants";

var initialState = {};
initialState[PLAYLIST_CONSTANTS.LIKED] = 0;

export function songNotifications(state = initialState, action) {
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
