import fetch from 'isomorphic-fetch';
import { CONSTANTS } from './constants';
import YouTubeFetcher from '../../others/youtube-api';

// TODO: use React Schema to make sure videos are in a nice format

function requestSearchResults(query) {
  return {
    type: CONSTANTS.REQUEST_SEARCH_RESULTS,
    query: query
  }
}

function receiveSearchResults(searchResults) {
  return {
    type: CONSTANTS.RECEIVE_SEARCH_RESULTS,
    searchResults: searchResults
  }
}

function extractSearchResults(searchResults) {
  var videos = searchResults.items;
  var extractedResults;

  if (videos) {
    extractedResults = (videos).map(video =>
      ({
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.default.url,
        description: video.snippet.description
      })
    )
  }

  return extractedResults;
}

export function clearSearchResults() {
  return {
    type: CONSTANTS.RECEIVE_SEARCH_RESULTS,
    searchResults: []
  }
}

export function fetchSearchResults(query) {
  return function (dispatch) {
    // FIXME: dispatch this action to enable loading wheel
    // while search results are getting prepared
    // dispatch(requestSearchResults(query));
    var youTubeFetcher = new YouTubeFetcher();
    youTubeFetcher.fetchSearchResults(query,
      function(searchResults) {
        var extractedResults = extractSearchResults(searchResults);
        dispatch(receiveSearchResults(extractedResults));
      }
    );
  }
}
