import { combineReducers } from 'redux';
import { currentSong, currentPlaylist, playlistsBySource } from './containers/PlaylistContainer/PlaylistReducer';
import { searchResults } from './containers/SearchContainer/SearchReducer';

const rootReducers = combineReducers({
  currentSong,
  currentPlaylist,
  playlistsBySource,
  searchResults
});

export default rootReducers;
