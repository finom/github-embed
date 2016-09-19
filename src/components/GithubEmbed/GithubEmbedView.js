import React, { PropTypes } from 'react';
import Loader from '../Loader';
import Header from '../Header';
import Footer from '../Footer';
import Frames from '../Frames';
import Error from '../Error';

const GithubEmbedView = ({
    loaded
}) => (<div className="github-embed-main">
    <Header />
    <Frames />
    <Footer />
    <Error />
    <Loader loaded={loaded} />
</div>);

GithubEmbedView.propTypes = {
    loaded: PropTypes.bool.isRequired
};

export default GithubEmbedView;
