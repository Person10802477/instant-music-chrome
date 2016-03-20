import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as VolumeControlActions from './VolumeControlActions';
import VolumeControl from '../../components/VolumeControl/VolumeControl';

const mapStateToProps = (state) => {
  return {
    currentVolume: state.currentVolume
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(VolumeControlActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeControl);
