import React from 'react';
import { connect } from 'react-redux';
import SongDisplay from '../../components/SongDisplay/SongDisplay';

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
    videoSize: state.videoSize
  }
}

export default connect(
  mapStateToProps, null
)(SongDisplay);
