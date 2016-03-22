import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as WebviewActions from './WebviewActions';
import Webview from '../../components/Webview/Webview';

const mapStateToProps = (state) => {
  return {
    videoSize: state.videoSize,
    isWebviewReady: state.isWebviewReady
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(WebviewActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Webview);
