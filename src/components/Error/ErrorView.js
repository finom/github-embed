import React, { PropTypes } from 'react';

const ErrorView = ({
    error
}) => (<div
    className="github-embed-error"
    style={{
        display: error ? '' : 'none'
    }}
>
    {error}
</div>);

ErrorView.propTypes = {
    error: PropTypes.string
};

export default ErrorView;
