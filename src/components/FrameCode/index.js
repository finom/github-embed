import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import FrameCodeView from './FrameCodeView';

function mapState({ frames }, { index }) {
    const {
        shown,
        code,
        type
    } = frames[index];
    
  return {
      shown,
      code,
      type
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(FrameCodeView);
