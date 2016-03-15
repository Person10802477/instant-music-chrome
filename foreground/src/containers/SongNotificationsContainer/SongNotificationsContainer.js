import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SongNotifications from '../../components/SongNotifications/SongNotifications';

const mapStateToProps = (state) => {
  return {
    numSongNotifications: state.numSongNotifications
  };
}

export default connect(
  mapStateToProps,
  null
)(SongNotifications);
