import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import FramesView from './FramesView';


function mapState(state) {
    return {
        types: state.frames.map(item => item.type)
    };
}

export default connect(mapState, null)(FramesView);
