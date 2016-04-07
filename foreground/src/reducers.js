import { combineReducers } from 'redux';
import { currentSong, currentPlaylist, playlistsBySource } from './containers/PlaylistContainer/PlaylistReducer';
import { searchResults } from './containers/SearchContainer/SearchReducer';
import { isPlaying } from './containers/ControlsContainer/ControlsReducer';
import { songNotifications } from './containers/SongNotificationsContainer/SongNotificationsReducer';
import { currentVolume } from './containers/VolumeControlContainer/VolumeControlReducer';
import { isShuffle, isRepeat } from './containers/AuxControlsContainer/AuxControlsReducer';
import { videoSize, isWebviewReady } from './containers/WebviewContainer/WebviewReducer';
import { currentContextMenu } from './containers/ContextMenuContainer/ContextMenuReducer';

const rootReducers = combineReducers({
  currentSong,
  currentPlaylist,
  playlistsBySource,
  searchResults,
  isPlaying,
  songNotifications,
  currentVolume,
  isShuffle,
  isRepeat,
  videoSize,
  isWebviewReady,
  currentContextMenu,
});

export default rootReducers;
