import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: we only need fetching-related functions here
import * as PlaylistActions from '../PlaylistContainer/PlaylistActions';
import MainArea from '../../components/MainArea/MainArea';

// Why not the syntax below??

// const mapStateToProps = (state) => {
//   currentPlaylist: state.currentPlaylist
// }

// const mapDispatchToProps = (dispatch) => {
//   actions: bindActionCreators(PlaylistActions, dispatch)
// }

const mapStateToProps = (state) => {
  return {
    currentPlaylist: state.currentPlaylist
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
