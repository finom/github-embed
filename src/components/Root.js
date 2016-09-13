import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import GithubEmbed from './GithubEmbed';

const Root = ({
    store
}) => (
    <Provider store={store}>
        <GithubEmbed />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
