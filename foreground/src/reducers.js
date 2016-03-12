import { combineReducers } from 'redux';
import { currentSong, currentPlaylist, playlistsBySource } from './containers/PlaylistContainer/PlaylistReducer';
import { searchResults } from './containers/SearchContainer/SearchReducer';
import { isPlaying } from './containers/ControlsContainer/ControlsReducer';

const rootReducers = combineReducers({
  currentSong,
  currentPlaylist,
  playlistsBySource,
  searchResults,
  isPlaying,
});

export default rootReducers;
