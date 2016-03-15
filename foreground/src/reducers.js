import { combineReducers } from 'redux';
import { currentSong, currentPlaylist, playlistsBySource } from './containers/PlaylistContainer/PlaylistReducer';
import { searchResults } from './containers/SearchContainer/SearchReducer';
import { isPlaying } from './containers/ControlsContainer/ControlsReducer';
import { numSongNotifications } from './containers/SongNotificationsContainer/SongNotificationsReducer';

const rootReducers = combineReducers({
  currentSong,
  currentPlaylist,
  playlistsBySource,
  searchResults,
  isPlaying,
  numSongNotifications,
});

export default rootReducers;
