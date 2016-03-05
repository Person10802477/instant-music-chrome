import { combineReducers } from 'redux';
import { currentPlaylist, playlistsBySource } from './containers/PlaylistContainer/PlaylistReducer';

const rootReducers = combineReducers({
  currentPlaylist,
  playlistsBySource,
});

export default rootReducers;
