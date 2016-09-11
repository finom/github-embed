import { connect } from 'react-redux';
import FrameCodeView from './FrameCodeView';

function mapState({ frames }, { index }) {
    const {
        shown,
        code,
        type
    } = frames[index];

    return {
        shown,
        code,
        type
    };
}

export default connect(mapState, null)(FrameCodeView);
