import fetch from 'isomorphic-fetch';
import { CONSTANTS, PLAYLIST_DATA } from './constants';
import * as SONG_NOTIFICATIONS_ACTIONS from '../SongNotificationsContainer/SongNotificationsActions';
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
    playlist: playlist,
    isFetching: true
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

function checkCurrentSongAndReceivePlaylist(playlist, songs) {
  return (dispatch, getState) => {
    var currentSong = getState().currentSong;

    if (!currentSong && songs) {
      dispatch(updateCurrentSong(songs[0]));
    }

    dispatch(receivePlaylist(playlist, songs))
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
  var areSongsEqual = true;

  if (!songs1 || !songs2 || (songs1.length !== songs2.length)) {
    return false;
  }

  _.each(songs1, function(song, idx) {
    if (song.videoId !== songs2[idx].videoId) {
      areSongsEqual = false;
    }
  });

  return areSongsEqual;
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
    // Clear song notifications when we navigate to look at local playlist
    if (playlist.source === CONSTANTS.LOCAL_SOURCE) {
      dispatch(SONG_NOTIFICATIONS_ACTIONS.clearSongNotifications());
    }

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
    dispatch(requestPlaylist(playlist));

    if (playlist.source === CONSTANTS.LOCAL_SOURCE && chrome.runtime.id) {
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
              dispatch(checkCurrentSongAndReceivePlaylist(playlist, songsWithVideoIds))
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

function addToChromeStorage(playlist, songs, song, dispatch) {
  var playlistName = playlist.playlistName;

  if (isUnique(songs, song)) {
    var songsUpdated = [...songs, song];
    var obj = {};
    obj[playlistName] = songsUpdated;
    chrome.storage.sync.set(obj, function(err) {
      if (err) {
        console.log("saving failed!", err)
      } else {
        dispatch(updateLocalPlaylistAndReceiveIfNecessary(playlist, songsUpdated));
        dispatch(SONG_NOTIFICATIONS_ACTIONS.addSongNotifications());
      }
    });
  }
}

function initChromeStorage(playlist, song, dispatch) {
  var playlistName = playlist.playlistName;
  var obj = {};
  var songsUpdated = [song];
  obj[playlistName] = songsUpdated;

  chrome.storage.sync.set(obj, function(err) {
    if (err) {
      console.log("saving failed!", err)
    } else {
      dispatch(updateLocalPlaylistAndReceiveIfNecessary(playlist, songsUpdated));
      dispatch(SONG_NOTIFICATIONS_ACTIONS.addSongNotifications());
    }
  });
}

export function addSongToLocalPlaylistAndChrome(playlist, song) {
  return (dispatch, getState) => {
    if (chrome.runtime.id) {
      getChromeSongs(playlist.playlistName, function(songs) {
        if (_.isEmpty(songs)) {
          initChromeStorage(playlist, song, dispatch);
        } else {
          addToChromeStorage(playlist, songs, song, dispatch);
        }
      });
    }

    // FIXME: DISPATCH A NOTIFICAITON HERE?
  }
}

function removeFromChromeStorage(playlist, songs, song, dispatch) {
  var playlistName = playlist.playlistName;
  var songsUpdated = _.reject(songs, (s => s.videoId === song.videoId));
  var obj = {};
  obj[playlistName] = songsUpdated;

  chrome.storage.sync.set(obj, function(err) {
    if (err) {
      console.log("removal failed!", err)
    } else {
      console.log("successfully removed");

      dispatch(updateLocalPlaylistAndReceiveIfNecessary(playlist, songsUpdated));
    }
  });
}

export function removeSongFromLocalPlaylistAndChrome(playlist, song) {
  return (dispatch, getState) => {
    if (chrome.runtime.id) {
      getChromeSongs(playlist.playlistName, function(songs) {
        if (!_.isEmpty(songs)) {
          removeFromChromeStorage(playlist, songs, song, dispatch);
        }
      });
    }
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

function updateLocalPlaylist(playlist, songs) {
  const updatedPlaylist = Object.assign({}, playlist,
    { songs: songs, isFetching: false, receivedAt: Date.now() }
  );

  return {
    type: CONSTANTS.UPDATE_LOCAL_PLAYLIST,
    playlist: updatedPlaylist
  }
}

export function updateLocalPlaylistAndReceiveIfNecessary(playlist, songs) {
  return (dispatch, getState) => {
    var currentPlaylist = getState().currentPlaylist;
    dispatch(updateLocalPlaylist(playlist, songs));

    // If we are looking at the playlist that the song was just added to,
    // we have to receive the new information
    if (currentPlaylist.source === playlist.source &&
      currentPlaylist.playlistName === playlist.playlistName) {
      dispatch(receivePlaylist(playlist, songs));
    }
  }
}

// FIXME: Supress updating currentPlaylist on initial load
export function loadLocalPlaylist() {
  return (dispatch) => {
    var favoritesPlaylist = PLAYLIST_DATA.local[0];
    dispatch(fetchPlaylist(favoritesPlaylist));
  }
}
