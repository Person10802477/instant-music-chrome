import fetch from 'isomorphic-fetch';
import { CONSTANTS, PLAYLIST_DATA } from './constants';
import * as SONG_NOTIFICATIONS_ACTIONS from '../SongNotificationsContainer/SongNotificationsActions';
import YouTubeFetcher from '../../others/youtube-api';

// FIXME: move me to somewhere appropriate
var API_URL = "http://instant-iv0npoz3.cloudapp.net/api";
// var API_URL = "http://localhost:3000/api";
// chrome.management.getSelf(function(result) {
//   result.installType === "development"
// })

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
      window.IM.sandboxMessenger.sendMessage({
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
    case CONSTANTS.SPOTIFY_SOURCE:
      return json.entries.items.map((song, idx) =>
        ({
          title: song['track']['name'],
          artist: song['track']['artists'][0]['name'],
          rank: song['current_position']
        })
      );
    default:
      return [];
  }
}

function checkCurrentSongAndReceivePlaylist(playlist, songs) {
  return (dispatch, getState) => {
    if (!getState().currentSong && songs) {
      dispatch(updateCurrentSong(songs[0]));
    }
    dispatch(receivePlaylist(playlist, songs));
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
      dispatch(SONG_NOTIFICATIONS_ACTIONS.clearSongNotifications(playlist.playlistName));
    }

    if (shouldFetchPlaylist(getState(), playlist)) {
      return dispatch(fetchPlaylist(playlist))
    }
  }
}

export function fetchPlaylist(playlist) {
  return function (dispatch) {
    dispatch(requestPlaylist(playlist));

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

function isUnique(songs, song) {
  return !_.find(songs, (s) => s.videoId === song.videoId);
}

export function addSongToPlaylist(playlist, song) {
  return (dispatch, getState) => {
    chrome.identity.getAuthToken({'interactive': true}, function(token) {
      $.post(API_URL+"/songs", {
        access_token: token,
        playlist_title: playlist.playlistName,
        video_id: song.videoId,
        title: song.title
      }, function(s) {
        var params = "songs?access_token="+token+"&playlist_title="+playlist.playlistName;
        var songAdded = {
          videoId: s.video_id,
          title: s.title
        };
        var songs = [...playlist.songs, songAdded];

        dispatch(updateLocalPlaylistAndReceiveIfNecessary(playlist, songs));
        dispatch(SONG_NOTIFICATIONS_ACTIONS.addSongNotifications(playlist.playlistName));
      });
    });
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

export function removeSongFromPlaylist(playlist, song) {
  return (dispatch, getState) => {
    chrome.identity.getAuthToken({'interactive': true}, function(token) {
      $.ajax({
        url: API_URL+"/songs/delete",
        data: {
          access_token: token,
          playlist_title: playlist.playlistName,
          videoId: song.videoId
        },
        type: 'DELETE',
        success: function() {
          var updatedSongs = _.reject(playlist.songs, (s) => s.videoId === song.videoId);
          dispatch(updateLocalPlaylistAndReceiveIfNecessary(playlist, updatedSongs))
        }
      });
    });
  }
}

function getRandomIdx(size) {
  return Math.floor(Math.random() * size);
}

// NOTE: Repeat is more important than shuffle
function getNextSong(state) {
  if (state.isRepeat) {
    return state.currentSong;
  } else if (state.isShuffle) {
    var randomIdx = getRandomIdx(state.currentPlaylist.songs.length);
    return state.currentPlaylist.songs[randomIdx];
  } else {
    var idx = _.findIndex(state.currentPlaylist.songs, (song) =>
    (song.videoId === state.currentSong.videoId));
    var nextIdx = (idx === state.currentPlaylist.songs.length-1) ? 0 : idx+1;
    return state.currentPlaylist.songs[nextIdx];
  }
}

// NOTE: Go with the natural flow even if shuffle/repeat is on
function getPrevSong(state) {
  var idx = _.findIndex(state.currentPlaylist.songs, (song) =>
    (song.videoId === state.currentSong.videoId));
  var prevIdx = (idx === 0) ? 0 : idx-1;
  return state.currentPlaylist.songs[prevIdx];
}

export function playNextSong() {
  return (dispatch, getState) => {
    var state = getState();
    var nextSong = getNextSong(state);
    dispatch(updateCurrentSongAndPlayIt(nextSong));
  }
}

export function playPrevSong() {
  return (dispatch, getState) => {
    var state = getState();
    var prevSong = getPrevSong(state);
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

function receiveUserPlaylists(playlists) {
  return {
    type: CONSTANTS.RECEIVE_USER_PLAYLISTS,
    playlists: playlists
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

// Make a playlist called "liked", which is the playlist
// where all the liked songs go. For the users who already have
// stored songs in Chrome storage, let's save these songs gracefully
// this will do it asynchronously
function initLikedPlaylist(dispatch) {
  getChromeSongs("favorites", function(songs) {
    dispatch(addPlaylist("liked", songs));
  });
}

function getUserPlaylists(token, dispatch) {
  $.ajax({
    url: API_URL+"/playlists?access_token="+token,
    type: 'GET',
    success: function(playlists) {
      if (!_.find(playlists, (pl) => pl.title === "liked")) {
        initLikedPlaylist(dispatch);
      }

      dispatch(receiveUserPlaylists(playlists));
    },
    error: function(err) {
      console.log(err);
    }
  });
}

export function loadUserPlaylists(token, isSlient=true) {
  return (dispatch) => { 
    if (token) {
      getUserPlaylists(token, dispatch);
    } else {
      chrome.identity.getAuthToken({ 'interactive': !isSlient }, function(token) {
        getUserPlaylists(token, dispatch);
      });
    }
  }
}

function _clearUserPlaylists() {
  return {
    type: CONSTANTS.CLEAR_USER_PLAYLISTS
  }
}

export function clearUserPlaylists() {
  return (dispatch) => {
    dispatch(_clearUserPlaylists());
  }
}

function isPlaylistTitleUnique(title, playlists) {
  return _.every(playlists, (pl) => pl.playlistName !== title);
}

function preloadLocalPlaylist(playlist) {
  return {
    type: CONSTANTS.PRELOAD_LOCAL_PLAYLIST,
    playlist: playlist,
    isFetching: true
  }
}

export function addPlaylist(title, songs=[]) {
  return (dispatch, getState) => {
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      // Check if there's a playlist with the same title
      var playlists = getState().playlistsBySource.local;
      if (!isPlaylistTitleUnique(title, playlists)) {
        title += playlists.length;
      }

      dispatch(preloadLocalPlaylist({
        source: "local",
        playlistName: title,
        isFetching: true
      }));

      $.ajax({
        type: "POST",
        url: API_URL+"/playlists",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          access_token: token,
          title,
          songs
        }),
        success: function(playlist) {
          dispatch(receiveUserPlaylists([playlist]))
        },
        error: function() {
          dispatch()
        }
      });
    });
  }
}

function _removePlaylist(title) {
  return {
    type: CONSTANTS.REMOVE_PLAYLIST,
    title
  }
}

export function removePlaylist(title) {
  return (dispatch, getState) => {
    chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
      $.ajax({
        url: API_URL+"/playlists/delete",
        data: {
          access_token: token,
          title
        },
        type: 'DELETE',
        success: function(result) {
          dispatch(_removePlaylist(title));
        }
      });
    });
  }
}
