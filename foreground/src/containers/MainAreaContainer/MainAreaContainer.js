import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: we only need fetching-related functions here
import * as PlaylistActions from '../PlaylistContainer/PlaylistActions';
import * as ContextMenuActions from '../ContextMenuContainer/ContextMenuActions';

import MainArea from '../../components/MainArea/MainArea';

const mapStateToProps = (state) => {
  return {
    currentPlaylist: state.currentPlaylist,
    currentSong: state.currentSong,
    localPlaylists: state.playlistsBySource['local'],
    videoSize: state.videoSize,
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
)(MainArea);
