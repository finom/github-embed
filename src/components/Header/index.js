import { connect } from 'react-redux';
import * as actions from '../../actions';
import HeaderView from './HeaderView';


function mapState(state) {
    const {
        owner,
        repo,
        ref
    } = state.settings || {};

    return {
        items: state.frames.map(item => ({
            label: item.label || item.path,
            shown: item.shown
        })),
        githubLink: `http://github.com/${owner}/${repo}/tree/${ref}/`
    };
}

function mapDispatch(dispatch) {
    return {
        onLabelClick: index => dispatch(actions.activateFrame(index))
    };
}

export default connect(mapState, mapDispatch)(HeaderView);
