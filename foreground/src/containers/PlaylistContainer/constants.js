export const CONSTANTS = {
  UPDATE_CURRENT_PLAYLIST: 'UPDATE_CURRENT_PLAYLIST',
  UPDATE_CURRENT_SONG: 'UPDATE_CURRENT_SONG',
  REQUEST_PLAYLIST: 'REQUEST_PLAYLIST',
  RECEIVE_PLAYLIST: 'RECEIVE_PLAYLIST',
  SETUP_PLAYLISTS: 'SETUP_PLAYLISTS',
  MELON_SOURCE: 'melon',
  ITUNES_SOURCE: 'itunes',
}

var PLAYLIST_DATA;

if (chrome.runtime.id) {
  PLAYLIST_DATA = {
    melon: [
      {source: 'melon', playlistName: chrome.i18n.getMessage("k_pop_trending"), url: "http://instantmusic.cloudapp.net/charts/realtime?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("k_pop_new"), url: "http://instantmusic.cloudapp.net/newreleases/songs?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("k_pop_ost"), url: "http://instantmusic.cloudapp.net/charts/topnames/DP0300?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("pop_trending"), url: "http://instantmusic.cloudapp.net/charts/topnames/DP0200?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("j_pop_trending"), url: "http://instantmusic.cloudapp.net/charts/topnames/DP0400?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("classic"), url: "http://instantmusic.cloudapp.net/charts/topnames/DP0500?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("newage"), url: "http://instantmusic.cloudapp.net/charts/topnames/DP0800?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("jazz"), url: "http://instantmusic.cloudapp.net/charts/topnames/DP0900?version=1&page=1&count=50"},
      {source: 'melon', playlistName: chrome.i18n.getMessage("christian"), url: "http://instantmusic.cloudapp.net/charts/topnames/DP0600?version=1&page=1&count=50"},
    ],
    itunes: [
      {source: 'itunes', playlistName: chrome.i18n.getMessage("us_pop"), url: 'https://itunes.apple.com/us/rss/topsongs/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("uk_pop"), url: 'https://itunes.apple.com/gb/rss/topsongs/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("k_pop"), url: 'https://itunes.apple.com/us/rss/topsongs/name=51/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("j_pop"), url: 'https://itunes.apple.com/jp/rss/topsongs/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("hiphop"), url: 'https://itunes.apple.com/us/rss/topsongs/name=18/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("RnB"), url: 'https://itunes.apple.com/us/rss/topsongs/name=15/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("electronic"), url: 'https://itunes.apple.com/us/rss/topsongs/name=7/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("jazz"), url: 'https://itunes.apple.com/us/rss/topsongs/name=11/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("songwriter"), url: 'https://itunes.apple.com/us/rss/topsongs/name=10/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("classic"), url: 'https://itunes.apple.com/us/rss/topsongs/name=5/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("reggae"), url: 'https://itunes.apple.com/us/rss/topsongs/name=24/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("country"), url: 'https://itunes.apple.com/us/rss/topsongs/name=6/limit=50'},
      {source: 'itunes', playlistName: chrome.i18n.getMessage("easy"), url: 'https://itunes.apple.com/us/rss/topsongs/name=25/limit=50'},
    ],
    local: [
      {source: 'local', playlistName: 'favorites', url: null}
    ]
  };
} else {
  PLAYLIST_DATA = {
    melon: [
      {source: 'melon', playlistName: "k_pop_trending", url: "http://instantmusic.cloudapp.net/charts/realtime?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "k_pop_new", url: "http://instantmusic.cloudapp.net/newreleases/songs?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "k_pop_ost", url: "http://instantmusic.cloudapp.net/charts/topnames/DP0300?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "pop_trending", url: "http://instantmusic.cloudapp.net/charts/topnames/DP0200?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "j_pop_trending", url: "http://instantmusic.cloudapp.net/charts/topnames/DP0400?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "classic", url: "http://instantmusic.cloudapp.net/charts/topnames/DP0500?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "newage", url: "http://instantmusic.cloudapp.net/charts/topnames/DP0800?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "jazz", url: "http://instantmusic.cloudapp.net/charts/topnames/DP0900?version=1&page=1&count=50"},
      {source: 'melon', playlistName: "christian", url: "http://instantmusic.cloudapp.net/charts/topnames/DP0600?version=1&page=1&count=50"},
    ],
    itunes: [
      {source: 'itunes', playlistName: "us_pop", url: 'https://itunes.apple.com/us/rss/topsongs/limit=50'},
      {source: 'itunes', playlistName: "uk_pop", url: 'https://itunes.apple.com/gb/rss/topsongs/limit=50'},
      {source: 'itunes', playlistName: "k_pop", url: 'https://itunes.apple.com/us/rss/topsongs/name=51/limit=50'},
      {source: 'itunes', playlistName: "j_pop", url: 'https://itunes.apple.com/jp/rss/topsongs/limit=50'},
      {source: 'itunes', playlistName: "hiphop", url: 'https://itunes.apple.com/us/rss/topsongs/name=18/limit=50'},
      {source: 'itunes', playlistName: "RnB", url: 'https://itunes.apple.com/us/rss/topsongs/name=15/limit=50'},
      {source: 'itunes', playlistName: "electronic", url: 'https://itunes.apple.com/us/rss/topsongs/name=7/limit=50'},
      {source: 'itunes', playlistName: "jazz", url: 'https://itunes.apple.com/us/rss/topsongs/name=11/limit=50'},
      {source: 'itunes', playlistName: "songwriter", url: 'https://itunes.apple.com/us/rss/topsongs/name=10/limit=50'},
      {source: 'itunes', playlistName: "classic", url: 'https://itunes.apple.com/us/rss/topsongs/name=5/limit=50'},
      {source: 'itunes', playlistName: "reggae", url: 'https://itunes.apple.com/us/rss/topsongs/name=24/limit=50'},
      {source: 'itunes', playlistName: "country", url: 'https://itunes.apple.com/us/rss/topsongs/name=6/limit=50'},
      {source: 'itunes', playlistName: "easy", url: 'https://itunes.apple.com/us/rss/topsongs/name=25/limit=50'},
    ],
    local: [
      {source: 'local', playlistName: 'favorites', url: null}
    ]
  };
}

export { PLAYLIST_DATA };
