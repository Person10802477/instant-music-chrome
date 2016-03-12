import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {playNextSong, playPrevSong} from '../PlaylistContainer/PlaylistActions';
import {playSong, pauseSong} from './ControlsActions';
import PlayerControls from '../../components/PlayerControls/PlayerControls';

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
  };
}

const mapDispatchToProps = (dispatch) => {
  var actions = {
    playSong,
    pauseSong,
    playNextSong,
    playPrevSong
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
