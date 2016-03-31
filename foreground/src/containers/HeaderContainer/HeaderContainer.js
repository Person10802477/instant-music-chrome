import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// FIXME: we only need fetching-related functions here
import * as PlaylistActions from '../PlaylistContainer/PlaylistActions';
import Header from '../../components/Header/Header';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(PlaylistActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Header);
