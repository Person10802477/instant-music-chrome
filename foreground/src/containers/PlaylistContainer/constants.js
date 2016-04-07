export const CONSTANTS = {
  UPDATE_CURRENT_PLAYLIST: 'UPDATE_CURRENT_PLAYLIST',
  UPDATE_CURRENT_SONG: 'UPDATE_CURRENT_SONG',
  REQUEST_PLAYLIST: 'REQUEST_PLAYLIST',
  RECEIVE_PLAYLIST: 'RECEIVE_PLAYLIST',
  SETUP_PLAYLISTS: 'SETUP_PLAYLISTS',
  MELON_SOURCE: 'melon',
  ITUNES_SOURCE: 'itunes',
  LOCAL_SOURCE: 'local',
  SPOTIFY_SOURCE: 'spotify',
  LOAD_VIDEO: 'LOAD_VIDEO',
  CUE_VIDEO: 'CUE_VIDEO',
  PAUSE_VIDEO: 'PAUSE_VIDEO',
  UPDATE_LOCAL_PLAYLIST: 'UPDATE_LOCAL_PLAYLIST',
  RECEIVE_USER_PLAYLISTS: 'RECEIVE_USER_PLAYLISTS',
  REMOVE_PLAYLIST: 'REMOVE_PLAYLIST',
}

var PLAYLIST_DATA;
var NUM_SONGS;

if (chrome.runtime.id) {
  NUM_SONGS = 50;
} else {
  NUM_SONGS = 5;
}


if (chrome.runtime.id) {
  PLAYLIST_DATA = {
    melon: [
      {source: 'melon', playlistName: chrome.i18n.getMessage("k_pop_trending"), url: "http://instant-iv0npoz3.cloudapp.net/charts/realtime?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("k_pop_new"), url: "http://instant-iv0npoz3.cloudapp.net/newreleases/songs?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("k_pop_ost"), url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0300?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("pop_trending"), url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0200?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("j_pop_trending"), url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0400?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("classic"), url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0500?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("newage"), url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0800?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("jazz"), url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0900?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: chrome.i18n.getMessage("christian"), url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0600?version=1&page=1&count="+NUM_SONGS},
    ],
    itunes: [
      {source: 'itunes', playlistName: chrome.i18n.getMessage("us_pop"), url: 'https://itunes.apple.com/us/rss/topsongs/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("uk_pop"), url: 'https://itunes.apple.com/gb/rss/topsongs/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("k_pop"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=51/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("j_pop"), url: 'https://itunes.apple.com/jp/rss/topsongs/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("hiphop"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=18/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("RnB"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=15/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("electronic"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=7/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("jazz"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=11/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("songwriter"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=10/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("classic"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=5/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("reggae"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=24/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("country"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=6/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("easy"), url: 'https://itunes.apple.com/us/rss/topsongs/genre=25/limit='+NUM_SONGS+'/explicit=true/json'},
    ],
    spotify: [
      {source: 'spotify', playlistName: "global", url: "http://instant-iv0npoz3.cloudapp.net/spotify/?country=global&recurrence=daily&date=latest&type=regional"},
      {source: 'spotify', playlistName: "viral", url: "http://instant-iv0npoz3.cloudapp.net/spotify/?country=global&recurrence=daily&date=latest&type=viral"},
    ],
    local: [
      // {source: 'local', playlistName: 'favorites', url: null}
    ]
  };
} else {
  PLAYLIST_DATA = {
    melon: [
      {source: 'melon', playlistName: "k_pop_trending", url: "http://instant-iv0npoz3.cloudapp.net/charts/realtime?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "k_pop_new", url: "http://instant-iv0npoz3.cloudapp.net/newreleases/songs?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "k_pop_ost", url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0300?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "pop_trending", url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0200?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "j_pop_trending", url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0400?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "classic", url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0500?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "newage", url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0800?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "jazz", url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0900?version=1&page=1&count="+NUM_SONGS},
      {source: 'melon', playlistName: "christian", url: "http://instant-iv0npoz3.cloudapp.net/charts/topgenres/DP0600?version=1&page=1&count="+NUM_SONGS},
    ],
    itunes: [
      {source: 'itunes', playlistName: "us_pop", url: 'https://itunes.apple.com/us/rss/topsongs/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "uk_pop", url: 'https://itunes.apple.com/gb/rss/topsongs/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "k_pop", url: 'https://itunes.apple.com/us/rss/topsongs/genre=51/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "j_pop", url: 'https://itunes.apple.com/jp/rss/topsongs/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "hiphop", url: 'https://itunes.apple.com/us/rss/topsongs/genre=18/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "RnB", url: 'https://itunes.apple.com/us/rss/topsongs/genre=15/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "electronic", url: 'https://itunes.apple.com/us/rss/topsongs/genre=7/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "jazz", url: 'https://itunes.apple.com/us/rss/topsongs/genre=11/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "songwriter", url: 'https://itunes.apple.com/us/rss/topsongs/genre=10/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "classic", url: 'https://itunes.apple.com/us/rss/topsongs/genre=5/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "reggae", url: 'https://itunes.apple.com/us/rss/topsongs/genre=24/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "country", url: 'https://itunes.apple.com/us/rss/topsongs/genre=6/limit='+NUM_SONGS+'/explicit=true/json'},
      {source: 'itunes', playlistName: "easy", url: 'https://itunes.apple.com/us/rss/topsongs/genre=25/limit='+NUM_SONGS+'/explicit=true/json'},
    ],
    spotify: [
      {source: 'spotify', playlistName: "global", url: "http://instant-iv0npoz3.cloudapp.net/spotify/?country=global&recurrence=daily&date=latest&type=regional"},
      {source: 'spotify', playlistName: "viral", url: "http://instant-iv0npoz3.cloudapp.net/spotify/?country=global&recurrence=daily&date=latest&type=viral"},
    ],
    local: [
      // {source: 'local', playlistName: 'favorites', url: null}
    ]
  };
}

export { PLAYLIST_DATA };
