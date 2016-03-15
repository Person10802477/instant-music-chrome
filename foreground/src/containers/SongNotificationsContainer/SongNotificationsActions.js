import { CONSTANTS } from './constants';

export function clearSongNotifications() {
  return {
    type: CONSTANTS.CLEAR_SONG_NOTIFICATIONS
  }
}

export function addSongNotifications() {
  return {
    type: CONSTANTS.ADD_SONG_NOTIFICATION
  }
}
