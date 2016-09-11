import { connect } from 'react-redux';
import FramesView from './FramesView';


function mapState(state) {
    return {
        types: state.frames.map(item => item.type)
    };
}

export default connect(mapState, null)(FramesView);
