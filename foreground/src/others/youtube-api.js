import $ from 'jquery';

const YOUTUBE_API_KEY = "AIzaSyCcNCtcaV7OSajn9PAzXS3Nh9XVNunkDKI";
const INITIAL_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&videoEmbeddable=true";
const YOUTUBE_SEARCH_URL = INITIAL_SEARCH_URL + "&key=" + YOUTUBE_API_KEY + "&maxResults=";

export default class YouTubeFetcher {
  constructor() {
    console.log("youtube Fetcher");
  }

  makeVideoIdReq(song) {
    var query = song.title + " " + song.artist;
    var numMaxResults = 1;

    // It returns an ajax request object instead of
    // firing it immediately
    return $.ajax({
      url: YOUTUBE_SEARCH_URL + numMaxResults,
      type: "GET",
      data: 'q='+encodeURIComponent(query)
    });
  }

  fetchAndAddVideoIds(songs, callback) {
    var videoIdReqs = songs.map((song) => this.makeVideoIdReq(song), this);
    $.when.apply($, videoIdReqs).then(function() {
      var ajaxResults = arguments;
      var songsWithVideoIds = songs.map((song, idx) => {
        var result = ajaxResults[idx][0];
        song.videoId = (result.items.length ? result.items[0].id.videoId : null);
        return song;
      });
      callback(songsWithVideoIds);
    });
  }

  fetchSearchResults(query, callback) {
    var numMaxResults = 5;

    $.ajax({
      url: YOUTUBE_SEARCH_URL + numMaxResults,
      type: "GET",
      data: 'q='+encodeURIComponent(query),
      success: function(data) {
        callback(data);
      },
      error: function(status) {
        console.log("YouTube: fetchSearchResults failed", status)
        // FIXME:
      }
    });
  }
}
