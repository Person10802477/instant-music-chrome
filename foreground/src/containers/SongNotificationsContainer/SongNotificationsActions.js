import { CONSTANTS } from './constants';

export function clearSongNotifications(playlistName) {
  return {
    type: CONSTANTS.CLEAR_SONG_NOTIFICATIONS,
    playlistName: playlistName
  }
}

export function addSongNotifications(playlistName) {
  return {
    type: CONSTANTS.ADD_SONG_NOTIFICATION,
    playlistName: playlistName
  }
}
