import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import bala from 'balajs';
import configureStore from './store/configureStore';
import Root from './components/Root';
import { initialize } from './actions';

module.exports = function githubEmbed(node, pathToSettings) {
    const store = configureStore();

    store.dispatch(initialize(pathToSettings));

    render(
        <AppContainer>
            <Root store={store} />
        </AppContainer>,
        bala.one(node)
    );


    if (module.hot) {
        module.hot.accept('./components/Root', () => {
            // eslint-disable-next-line global-require
            const RootContainer = require('./components/Root').default;

            render(
                <AppContainer>
                    <RootContainer store={store} />
                </AppContainer>,
                bala.one(node)
            );
        });
    }
};
