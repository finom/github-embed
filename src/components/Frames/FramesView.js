import React, { PropTypes } from 'react';
import FrameHTML from '../FrameHTML';
import FrameCode from '../FrameCode';

const FramesView = ({
    types
}) => (<div className="github-embed-frames">
    {types.map((type, index) => (
        type === 'htmlpage' ?
            <FrameHTML key={index} index={index} /> :
                <FrameCode key={index} index={index} />
    ))}
</div>);

FramesView.propTypes = {
    types: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default FramesView;
