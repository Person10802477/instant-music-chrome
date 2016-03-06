import $ from 'jquery';

const YOUTUBE_API_KEY = "AIzaSyCcNCtcaV7OSajn9PAzXS3Nh9XVNunkDKI";
const INITIAL_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&maxResults=1&videoEmbeddable=true";
const YOUTUBE_SEARCH_URL = INITIAL_SEARCH_URL + "&key=" + YOUTUBE_API_KEY;

export default class YouTubeFetcher {
  constructor() {
    console.log("youtube Fetcher");
  }

  makeVideoIdReq(song) {
    var query = song.title + " " + song.artist;
    return $.ajax({
      url: YOUTUBE_SEARCH_URL,
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
}
