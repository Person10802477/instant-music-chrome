import { combineReducers } from 'redux';
import { currentSong, currentPlaylist, playlistsBySource } from './containers/PlaylistContainer/PlaylistReducer';

const rootReducers = combineReducers({
  currentSong,
  currentPlaylist,
  playlistsBySource,
});

export default rootReducers;
