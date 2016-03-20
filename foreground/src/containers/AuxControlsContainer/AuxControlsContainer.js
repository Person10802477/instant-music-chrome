import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CONSTANTS } from './constants';
import * as AuxControlsActions from './AuxControlsActions';
import AuxControls from '../../components/AuxControls/AuxControls';

const mapStateToProps = (state) => {
  return {
    isShuffle: state.isShuffle,
    isRepeat: state.isRepeat
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuxControlsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuxControls);
