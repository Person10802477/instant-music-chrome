import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: we only need fetching-related functions here
import * as SearchActions from './SearchActions';
import { addSongToPlaylist } from '../PlaylistContainer/PlaylistActions';
import SearchBar from '../../components/SearchBar/SearchBar';

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults
  };
}

const mapDispatchToProps = (dispatch) => {
  var actions = Object.assign({}, SearchActions, {
    addSongToPlaylist
  });

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
