import React, { PropTypes } from 'react';

const FrameHTMLView = ({
    shown,
    loaded,
    url: src,
    onLoad
}) => (<iframe
    {...(loaded ? { src } : {})}
    style={{
        display: shown ? '' : 'none'
    }}
    title={src}
    onLoad={() => onLoad()}
/>);

FrameHTMLView.propTypes = {
    shown: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    onLoad: PropTypes.func.isRequired
};

export default FrameHTMLView;
