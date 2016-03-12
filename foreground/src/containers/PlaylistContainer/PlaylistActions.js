import fetch from 'isomorphic-fetch';
import { CONSTANTS, PLAYLIST_DATA } from './constants';
import YouTubeFetcher from '../../others/youtube-api';

export function updateCurrentPlaylist(playlist) {
  return {
    type: CONSTANTS.UPDATE_CURRENT_PLAYLIST,
    playlist
  }
}

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
    if (chrome.runtime.id) {
      window.app.sandboxMessenger.sendMessage({
        type: CONSTANTS.LOAD_VIDEO,
        videoId: song.videoId
      });
    }

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
      return json.melon.songs.song.map((song, idx) =>
        ({
          title: song.songName,
          artist: song.artists.artist[0].artistName,
          rank: song.currentRank || idx+1,
        })
      );
    case CONSTANTS.ITUNES_SOURCE:
      return json.feed.entry.map((song, idx) =>
        ({
          title: song['im:name']['label'],
          artist: song['im:artist']['label'],
          rank: idx+1,
        })
      );
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

function areSongsEqual(songs1, songs2) {
  if (!songs1 || !songs2 || (songs1.length !== songs2.length)) {
    return false;
  }

  _.each(songs1, function(song, idx) {
    if (song.videoId !== songs2[idx].videoId) {
      return false;
    }
  });

  return true;
}

function shouldInvalidate(receivedAt) {
  var now = Date.now();
  var hr = 1000 * 60 * 60;
  return (now - receivedAt) > hr;
}

function shouldFetchPlaylist(state, nextPlaylist) {
  const currentPlaylist = getTargetPlaylist(state, nextPlaylist);

  if (!currentPlaylist.songs) {
    return true;
  } else if (currentPlaylist.source === CONSTANTS.LOCAL_SOURCE) {
    return !areSongsEqual(currentPlaylist.songs, nextPlaylist.songs);
  } else if (currentPlaylist.isFetching) {
    return false
  } else {
    shouldInvalidate(currentPlaylist.receivedAt)
  }
}

export function fetchPlaylistIfNeeded(playlist) {
  return (dispatch, getState) => {
    if (shouldFetchPlaylist(getState(), playlist)) {
      return dispatch(fetchPlaylist(playlist))
    }
  }
}

function getChromeSongs(playlistName, callback) {
  chrome.storage.sync.get(playlistName, function(keyValuePair) {
    if (_.isEmpty(keyValuePair)) {
      callback([])
    } else {
      callback(keyValuePair[playlistName]);
    }
  });
}

export function fetchPlaylist(playlist) {
  return function (dispatch) {
    // NOTE: We dispatch this action just to start the loading wheel
    dispatch(requestPlaylist(playlist));

    if (playlist.source === CONSTANTS.LOCAL_SOURCE) {
      getChromeSongs(playlist.playlistName, function(songs) {
        dispatch(receivePlaylist(playlist, songs));
      });
    } else {
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
}

function isUnique(songs, song) {
  return !_.find(songs, (s) => s.videoId === song.videoId);
}

function addToChromeStorage(playlistName, songs, song) {
  if (isUnique(songs, song)) {
    var songsUpdated = [...songs, song];
    var obj = {};
    obj[playlistName] = songsUpdated;
    chrome.storage.sync.set(obj, function(err) {
      if (err) {
        console.log("saving failed!", err)
      } else {
        console.log("successfully added");
      }
    });
  }
}

function initChromeStorage(playlistName, song) {
  var obj = {};
  obj[playlistName] = [song];
  chrome.storage.sync.set(obj, function(err) {
    if (err) {
      console.log("saving failed!", err)
    } else {
      console.log("successfully added");
    }
  });
}

function saveOnChrome(playlistName, song) {
  getChromeSongs(playlistName, function(songs) {
    if (_.isEmpty(songs)) {
      initChromeStorage(playlistName, song);
    } else {
      addToChromeStorage(playlistName, songs, song);
    }
  });
}

function addSongToLocalPlaylist(playlist, song) {
  return {
    type: CONSTANTS.ADD_SONG_TO_LOCAL_PLAYLIST,
    playlist,
    song
  }
}

export function addSongToLocalPlaylistAndChrome(playlist, song) {
  return (dispatch, getState) => {
    if (chrome.runtime.id) {
      saveOnChrome(playlist.playlistName, song);  
    }

    // FIXME: dispatch a notification here too
    dispatch(addSongToPlaylist(playlist, song))
  }
}

function getNextSong(currentSong, currentPlaylist) {
  var idx = _.findIndex(currentPlaylist.songs, (song) =>
    (song.videoId === currentSong.videoId));
  var nextIdx = (idx === currentPlaylist.songs.length-1) ? 0 : idx+1;
  return currentPlaylist.songs[nextIdx];
}

function getPrevSong(currentSong, currentPlaylist) {
  var idx = _.findIndex(currentPlaylist.songs, (song) =>
    (song.videoId === currentSong.videoId));
  var prevIdx = (idx === 0) ? 0 : idx-1;
  return currentPlaylist.songs[prevIdx];
}

export function playNextSong() {
  return (dispatch, getState) => {
    var state = getState();
    var nextSong = getNextSong(state.currentSong, state.currentPlaylist);
    dispatch(updateCurrentSongAndPlayIt(nextSong));
  }
}

export function playPrevSong() {
  return (dispatch, getState) => {
    var state = getState();
    var prevSong = getPrevSong(state.currentSong, state.currentPlaylist);
    dispatch(updateCurrentSongAndPlayIt(prevSong));
  }
}

// videoId, title, description, thumbnail
// FIXME: I also need to add this song to local 'favorites' playlist
// FIXME: on add song, clear the search results
// it's more like addSongToCurrentPlaylist
export function addSongToPlaylist(playlist, song) {
  return {
    type: CONSTANTS.ADD_SONG_TO_PLAYLIST,
    playlist,
    song,
  }
}
