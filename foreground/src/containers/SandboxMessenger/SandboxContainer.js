import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: get the related ones
import * as PlaylistActions from './PlaylistActions';
import Playlists from '../../components/Playlists/Playlists';

const mapStateToProps = (state) => {
  return {
    currentPlaylist: state.currentPlaylist,
    playlists: state.playlistsBySource
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(PlaylistActions, dispatch)
  };
}

// I want to subscribe to a store,
// but I dont necessary have a component

export default connect(
  mapStateToProps,
  mapDispatchToProps
)();
