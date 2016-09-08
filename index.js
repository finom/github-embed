import './css/style.css';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './components/Root';
import bala from 'balajs';
import { initialize } from './actions';

module.exports = function githubEmbed(node, pathToSettings) {
    const store = configureStore();

    store.dispatch(initialize(pathToSettings));

    render(
      <AppContainer>
        <Root
          store={ store }
        />
      </AppContainer>,
      bala.one(node)
    );



    if (module.hot) {
      module.hot.accept('./components/Root', () => {
        const RootContainer = require('./components/Root').default;
        render(
          <AppContainer>
            <RootContainer
              store={ store }
            />
          </AppContainer>,
          bala.one(node)
        );
      });
    }
}
