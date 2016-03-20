import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: we only need fetching-related functions here
import * as PlaylistActions from '../PlaylistContainer/PlaylistActions';
import Webview from '../../components/Webview/Webview';

const mapStateToProps = (state) => {
  return {
    state: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Webview);
