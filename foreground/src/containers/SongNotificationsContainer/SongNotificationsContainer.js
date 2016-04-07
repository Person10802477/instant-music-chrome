import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SongNotifications from '../../components/SongNotifications/SongNotifications';

const mapStateToProps = (state) => {
  return {
    songNotifications: state.songNotifications
  };
}

export default connect(
  mapStateToProps,
  null
)(SongNotifications);
