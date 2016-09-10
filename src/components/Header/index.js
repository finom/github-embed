import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import HeaderView from './HeaderView';


function mapState(state) {
    return {
        items: state.frames.map(item => ({
            label: item.label || item.path,
            shown: item.shown
        }))
    };
}

function mapDispatch(dispatch) {
    return {
        onLabelClick: index => dispatch(actions.activateFrame(index))
    };
}

export default connect(mapState, mapDispatch)(HeaderView);
