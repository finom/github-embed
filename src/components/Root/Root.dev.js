import { PropTypes } from 'react';
import { Provider } from 'react-redux';
import GithubEmbed from '../GithubEmbed';
import DevTools from '../DevTools';

const Root = ({
    store
}) => (
    <Provider store={store}>
        <GithubEmbed />

    </Provider>
);
//<DevTools />
Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
