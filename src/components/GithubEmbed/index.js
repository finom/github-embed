import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import GithubEmbedView from './GithubEmbedView';

function mapState(state) {
    return {
        loaded: state.loaded
    };
}

function mapDispatch(dispatch) {
    return {};
}

export default connect(mapState, mapDispatch)(GithubEmbedView);
