import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import FrameHTMLView from './FrameHTMLView';


function mapState({ frames }, { index }) {
    const {
        shown,
        loaded,
        url
    } = frames[index];

    return {
        shown,
        loaded,
        url
    };
}

function mapDispatch(dispatch) {
    return {
        onLoad: () => dispatch(actions.setLoaded(true))
    };
}

export default connect(mapState, mapDispatch)(FrameHTMLView);
