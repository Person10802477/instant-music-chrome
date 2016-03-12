import * as SearchActions from "./SearchActions";
import { CONSTANTS } from "./constants";

export function searchResults(state = {
  results: [], isFetching: false
}, action) {
  switch (action.type) {
    case CONSTANTS.REQUEST_SEARCH_RESULTS:
      return Object.assign({}, state, {isFetching: true});
    case CONSTANTS.RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, {
        results: action.searchResults,
        isFetching: false,
      });

      // return action.searchResults;
    default:
      return state
  }
}

export {
  searchResults
};
