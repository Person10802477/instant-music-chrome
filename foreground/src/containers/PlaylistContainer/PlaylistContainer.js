import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PlaylistActions from './PlaylistActions';
import Playlists from '../../components/Playlists/Playlists';
import * as ContextMenuActions from '../ContextMenuContainer/ContextMenuActions';

const mapStateToProps = (state) => {
  return {
    currentPlaylist: state.currentPlaylist,
    playlists: state.playlistsBySource,
    songNotifications: state.songNotifications
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({},
      PlaylistActions, ContextMenuActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
