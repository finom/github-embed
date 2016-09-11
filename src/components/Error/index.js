import { connect } from 'react-redux';
import HeaderView from './ErrorView';


function mapState(state) {
    return {
        error: state.error
    };
}

export default connect(mapState, null)(HeaderView);
