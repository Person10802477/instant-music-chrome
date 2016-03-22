import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PlaylistActions from './PlaylistActions';
import Playlists from '../../components/Playlists/Playlists';

const mapStateToProps = (state) => {
  return {
    currentPlaylist: state.currentPlaylist,
    playlists: state.playlistsBySource,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(PlaylistActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
