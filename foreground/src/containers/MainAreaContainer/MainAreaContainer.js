import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: we only need fetching-related functions here
import * as PlaylistActions from '../PlaylistContainer/PlaylistActions';
import MainArea from '../../components/MainArea/MainArea';

const mapStateToProps = (state) => {
  return {
    currentPlaylist: state.currentPlaylist,
    currentSong: state.currentSong,
    localPlaylist: state.playlistsBySource['local'][0],
    videoSize: state.videoSize,
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
)(MainArea);
