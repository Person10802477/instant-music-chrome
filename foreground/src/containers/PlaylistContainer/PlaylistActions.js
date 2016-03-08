import fetch from 'isomorphic-fetch';
import { CONSTANTS, PLAYLIST_DATA } from './constants';
import YouTubeFetcher from '../../others/youtube-api';

export function updateCurrentPlaylist(playlist) {
  return {
    type: CONSTANTS.UPDATE_CURRENT_PLAYLIST,
    playlist
  }
}

// Call this when we automatically advance to the next video
export function updateCurrentSong(song) {
  return {
    type: CONSTANTS.UPDATE_CURRENT_SONG,
    song
  }
}

// FIXME: call this in appropriate places
// Call this when the user chooses a song from the playlist
export function updateCurrentSongAndPlayIt(song) {
  return (dispatch) => {
    window.app.sandboxMessenger.sendMsg({
      type: CONSTANTS.LOAD_VIDEO,
      videoId: song.videoId
    });

    dispatch(updateCurrentSong(song));
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

function receivePlaylist(playlist, songs) {
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
      .then(json => {
        var youTubeFetcher = new YouTubeFetcher();
        var songs = extractSongsFromJson(playlist.source, json);
        youTubeFetcher.fetchAndAddVideoIds(songs,
          function(songsWithVideoIds) {
            dispatch(receivePlaylist(playlist, songsWithVideoIds))
          }
        );
      }
    );
  }
}

// videoId, title, description, thumbnail
// FIXME: I also need to add this song to local 'favorites' playlist
// FIXME: on add song, clear the search results
export function addSongToPlaylist(song) {
  return {
    type: CONSTANTS.ADD_SONG_TO_PLAYLIST,
    song
  }
}
