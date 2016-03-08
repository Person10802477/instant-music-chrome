import * as SearchActions from "./SearchActions";
import { CONSTANTS } from "./constants";

export function searchResults(state = [], action) {
  switch (action.type) {
    case CONSTANTS.REQUEST_SEARCH_RESULTS:
      console.log("searching...")
      return false;
    case CONSTANTS.RECEIVE_SEARCH_RESULTS:
      return action.searchResults;
    default:
      return state
  }
}

export {
  searchResults
};
