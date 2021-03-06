import * as PlaylistActions from "./PlaylistActions";
import { CONSTANTS, PLAYLIST_DATA } from "./constants";

var initialPlaylist;
if (chrome.runtime.id && (chrome.i18n.getMessage("@@ui_locale") === "ko" || chrome.i18n.getMessage("@@ui_locale") === "ko-kr")) {
  initialPlaylist = PLAYLIST_DATA['melon'][0];
} else {
  initialPlaylist = PLAYLIST_DATA['itunes'][0];
}

function currentPlaylist(state = initialPlaylist, action) {
  switch (action.type) {
    case CONSTANTS.UPDATE_CURRENT_PLAYLIST:
      return action.playlist || initialPlaylist;
    case CONSTANTS.REQUEST_PLAYLIST:
    case CONSTANTS.RECEIVE_PLAYLIST:
      return action.playlist
      break;
    default:
      return state;
  }
}

function updatedPlaylists(playlistUpdated, oldPlaylists) {
  // should be immutable
  const source = playlistUpdated.source;
  const idxToUpdate = _.findIndex(oldPlaylists[source], (pl) =>
    pl.playlistName === playlistUpdated.playlistName
  );

  // NOTE: using $ to deep copy playlists
  // http://stackoverflow.com/questions/36458948/redux-not-re-rendering-when-nested-object-gets-updated
  var playlists = $.extend(true, {}, oldPlaylists);
  playlists[source][idxToUpdate] = playlistUpdated;
  return playlists;
}

function transformedPlaylist(state=[], action) {
  var oldPlaylist = _.find(state, (pl) =>
    pl.playlistName === action.playlist.playlistName);

  switch (action.type) {
    case CONSTANTS.REQUEST_PLAYLIST:
      return Object.assign({}, oldPlaylist, {
        isFetching: true // FIXME do I really need isFetching here
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

// make "liked" playlist the head if necessary
function _reorderPlaylists(playlists) {
  var likedPlaylistIdx = _.findIndex(playlists, (pl) => pl.playlistName === CONSTANTS.LIKED);
  if (likedPlaylistIdx > 0) {
    var likedPlaylist = playlists[likedPlaylistIdx];
    playlists.splice(likedPlaylistIdx, 1);
    playlists.unshift(likedPlaylist);
  }
  return playlists;
}

function filterPreloadedPlaylists(pastPlaylists, newPlaylists) {
  var newPlaylistsNames = _.map(newPlaylists, (pl) => pl.playlistName);
  var filteredPlaylists = _.reject(pastPlaylists, (pl) =>
    _.contains(newPlaylistsNames, pl.playlistName)
  )
  return filteredPlaylists;
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
    case CONSTANTS.RECEIVE_USER_PLAYLISTS:
      var userPlaylists = action.playlists.map((pl) => {
        var songs;

        // don't need this step if API provided videoId instead of video_id
        if (pl.songs) {
          songs = pl.songs.map((s) => ({
            videoId: s.video_id,
            title: s.title
          }));
        } else {
          songs = [];
        }

        return {
          playlistName: pl.title,
          source: 'local',
          songs: songs,
          receivedAt: new Date(),
          isFetching: false
        };
      });

      var localPlaylists = filterPreloadedPlaylists(state.local, userPlaylists);
      // FIXME: this will take a lot of time everytime I do this.
      var orderedPlaylists = _reorderPlaylists([...localPlaylists, ...userPlaylists]);
      var playlistsWithUserPlaylists = Object.assign({}, state, {
        local: orderedPlaylists
      });

      return playlistsWithUserPlaylists;
    case CONSTANTS.REMOVE_PLAYLIST:
      var localPlaylists = _.reject(state.local, (pl) =>
        pl.playlistName === action.title);
      var playlists = Object.assign({}, state, {
        local: localPlaylists
      });
      return playlists;
    case CONSTANTS.CLEAR_USER_PLAYLISTS:
      var playlists = Object.assign({}, state, {
        local: []
      });
      return playlists;
    case CONSTANTS.PRELOAD_LOCAL_PLAYLIST:
      var localPlaylists = [...state.local, action.playlist];
      var playlists = Object.assign({}, state, {
        local: localPlaylists
      });
      return playlists;
    default:
      return state
  }
}

function currentSong(state = null, action) {
  switch (action.type) {
    case CONSTANTS.UPDATE_CURRENT_SONG:
      return action.song;
    case CONSTANTS.RECEIVE_PLAYLIST:
      return state || action.playlist.songs[0] || null
    default:
      return state;
  }
}

export {
  currentSong,
  currentPlaylist,
  playlistsBySource
};
