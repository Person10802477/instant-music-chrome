import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContextMenuActions from './ContextMenuActions';
import ContextMenu from '../../components/ContextMenu/ContextMenu';

const mapStateToProps = (state) => {
  return {
    currentContextMenu: state.currentContextMenu
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ContextMenuActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
