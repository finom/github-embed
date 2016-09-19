import React from 'react';
import { render } from 'react-dom';

import bala from 'balajs';
import configureStore from './store/configureStore';
import Root from './components/Root';
import { initialize } from './actions';

let Wrap;

if (process.env.NODE_ENV === 'development') {
    Wrap = require('react-hot-loader').AppContainer;
} else {
    Wrap = ({ children }) => children;
}

module.exports = function githubEmbed(node, pathToSettings) {
    const store = configureStore();

    store.dispatch(initialize(pathToSettings));

    render(
        <Wrap>
            <Root store={store} />
        </Wrap>,
        bala.one(node)
    );


    if (module.hot) {
        module.hot.accept('./components/Root', () => {
            // eslint-disable-next-line global-require
            const RootContainer = require('./components/Root').default;

            render(
                <Wrap>
                    <RootContainer store={store} />
                </Wrap>,
                bala.one(node)
            );
        });
    }
};
