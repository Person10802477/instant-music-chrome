import { combineReducers } from 'redux';
import { currentSong, currentPlaylist, playlistsBySource } from './containers/PlaylistContainer/PlaylistReducer';
import { searchResults } from './containers/SearchContainer/SearchReducer';
import { isPlaying } from './containers/ControlsContainer/ControlsReducer';
import { numSongNotifications } from './containers/SongNotificationsContainer/SongNotificationsReducer';
import { currentVolume } from './containers/VolumeControlContainer/VolumeControlReducer';
import { isShuffle, isRepeat } from './containers/AuxControlsContainer/AuxControlsReducer';

const rootReducers = combineReducers({
  currentSong,
  currentPlaylist,
  playlistsBySource,
  searchResults,
  isPlaying,
  numSongNotifications,
  currentVolume,
  isShuffle,
  isRepeat,
});

export default rootReducers;
