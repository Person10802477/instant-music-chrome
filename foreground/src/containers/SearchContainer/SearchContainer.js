import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: we only need fetching-related functions here
import * as SearchActions from './SearchActions';
import SearchBar from '../../components/SearchBar/SearchBar';

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SearchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
