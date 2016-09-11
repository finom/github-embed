import { connect } from 'react-redux';
import GithubEmbedView from './GithubEmbedView';

function mapState(state) {
    return {
        loaded: state.loaded
    };
}

export default connect(mapState, null)(GithubEmbedView);
