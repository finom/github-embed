import React, { PropTypes } from 'react';

const Loader = ({ loaded }) => (<div
    className="github-embed-loader"
    style={{
        display: loaded ? 'none' : ''
    }}
/>);


Loader.propTypes = {
    loaded: PropTypes.bool.isRequired
};

export default Loader;
