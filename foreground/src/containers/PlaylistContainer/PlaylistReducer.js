import * as PlaylistActions from "./PlaylistActions";
import { CONSTANTS, PLAYLIST_DATA } from "./constants";

function currentPlaylist(state = PLAYLIST_DATA['melon'][0], action) {
  switch (action.type) {
    case CONSTANTS.UPDATE_CURRENT_PLAYLIST:
      return action.playlist || PLAYLIST_DATA['melon'][0];
    case CONSTANTS.RECEIVE_PLAYLIST:
      return action.playlist
      break;
    default:
      return state;
  }
}

// helper
function transformedPlaylist(state=[], action) {
  var oldPlaylist = _.find(state, (pl) =>
    pl.playlistName === action.playlist.playlistName);

  switch (action.type) {
    case CONSTANTS.REQUEST_PLAYLIST:
      return Object.assign({}, oldPlaylist, {
        isFetching: true
      });
    case CONSTANTS.RECEIVE_PLAYLIST:
    case CONSTANTS.UPDATE_LOCAL_PLAYLIST:
      return Object.assign({}, oldPlaylist, action.playlist, {
        isFetching: false,
      });
    default:
      return oldPlaylist
  }
}

// helper
function updatedPlaylists(playlistUpdated, oldPlaylists) {
  const source = playlistUpdated.source;
  const idxToUpdate = _.findIndex(oldPlaylists[source], (pl) =>
    pl.playlistName === playlistUpdated.playlistName
  );
  var playlists = Object.assign({}, oldPlaylists);
  playlists[source][idxToUpdate] = playlistUpdated;
  return playlists;
}

function playlistsBySource(state = PLAYLIST_DATA, action) {
  switch (action.type) {
    case CONSTANTS.SETUP_PLAYLISTS:
      return Object.assign({}, PLAYLIST_DATA);
    case CONSTANTS.INVALIDATE_SUBREDDIT:
    case CONSTANTS.REQUEST_PLAYLIST:
    case CONSTANTS.RECEIVE_PLAYLIST:
    case CONSTANTS.UPDATE_LOCAL_PLAYLIST:
      var playlistUpdated = transformedPlaylist(state[action.playlist.source], action);
      return updatedPlaylists(playlistUpdated, state);
    default:
      return state
  }
}

function currentSong(state = null, action) {
  switch (action.type) {
    case CONSTANTS.UPDATE_CURRENT_SONG:
      return action.song;
    case CONSTANTS.RECEIVE_PLAYLIST:
      return state || action.playlist.songs[0];
    default:
      return state;
  }
}

export {
  currentSong,
  currentPlaylist,
  playlistsBySource
};
