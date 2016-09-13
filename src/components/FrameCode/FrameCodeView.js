import React, { Component, PropTypes } from 'react';
import { highlightBlock } from 'highlight.js';

class FrameCodeView extends Component {
    componentDidUpdate() {
        const {
            code,
            shown
        } = this.props;

        if (!this.highlighted && shown && code) {
            highlightBlock(this.ref);
            this.highlighted = true;
        }
    }

    render() {
        const {
            code,
            shown,
            type
        } = this.props;

        return (<pre
            ref={(ref) => { this.ref = ref; }}
            className={type}
            style={{
                display: shown ? '' : 'none'
            }}
        >
            {code}
        </pre>);
    }
}

FrameCodeView.propTypes = {
    code: PropTypes.string.isRequired,
    shown: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
};

export default FrameCodeView;
