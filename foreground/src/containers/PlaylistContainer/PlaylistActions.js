import fetch from 'isomorphic-fetch';
import { CONSTANTS, PLAYLIST_DATA } from './constants';

export function updateCurrentPlaylist(playlist) {
  return {
    type: CONSTANTS.UPDATE_CURRENT_PLAYLIST,
    playlist
  }
}

export function setupPlaylists() {
  return {
    type: CONSTANTS.SETUP_PLAYLISTS
  }
}

function requestPlaylist(playlist) {
  return {
    type: CONSTANTS.REQUEST_PLAYLIST,
    playlist: playlist
  }
}

function extractSongsFromJson(source, json) {
  switch (source) {
    case CONSTANTS.MELON_SOURCE:
      return json.melon.songs.song.map((song) =>
        ({
          title: song.songName,
          artist: song.artists.artist[0].artistName,
          rank: song.currentRank,
        })
      );
    case CONSTANTS.ITUNES_SOURCE:
      debugger
      return [];
    default:
      return [];
  }
}

function receivePlaylist(playlist, json) {
  const songs = extractSongsFromJson(playlist.source, json);
  const updatedPlaylist = Object.assign({}, playlist,
    { songs: songs, isFetching: false, receivedAt: Date.now() }
  );

  return {
    type: CONSTANTS.RECEIVE_PLAYLIST,
    playlist: updatedPlaylist
  }
}

function getTargetPlaylist(state, playlist) {
  const target = _.find(state.playlistsBySource[playlist.source], (pl) =>
    (pl.playlistName === playlist.playlistName)
  );
  console.log("getTarget: ", target);
  return target;
}

function shouldFetchPlaylist(state, playlist) {
  const target = getTargetPlaylist(state, playlist);

  if (!target.songs) {
    return true;
  } else if (target.isFetching) {
    return false
  } else {
    return target.didInvalidate;
  }
}

export function fetchPlaylistIfNeeded(playlist) {
  return (dispatch, getState) => {
    if (shouldFetchPlaylist(getState(), playlist)) {
      return dispatch(fetchPlaylist(playlist))
    }
  }
}

export function fetchPlaylist(playlist) {
  return function (dispatch) {
    // NOTE: We dispatch this action just to start the loading wheel
    dispatch(requestPlaylist(playlist));

    return fetch(playlist.url)
      .then(response => response.json())
      .then(json => dispatch(receivePlaylist(playlist, json))
    );
  }
}

// function posts(state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//       return Object.assign({}, state, {
//         didInvalidate: true
//       })
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       })
//     case RECEIVE_POSTS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       })
//     default:
//       return state
//   }
// }

// function postsBySubreddit(state = { }, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.subreddit]: posts(state[action.subreddit], action)
//       })
//     default:
//       return state
//   }
// }


// export function fetchPostsIfNeeded(subreddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), subreddit)) {
//       return dispatch(fetchPosts(subreddit))
//     }
//   }
// }
