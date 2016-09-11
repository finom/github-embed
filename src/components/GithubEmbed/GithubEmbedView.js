import { PropTypes } from 'react';
import Loader from 'react-loader';
import Header from '../Header';
import Footer from '../Footer';
import Frames from '../Frames';

const GithubEmbedView = ({
    loaded
}) => (<div className="github-embed-main">
    <Header />
    <Frames />
    <Footer />
    <Loader loaded={loaded} />
</div>);

GithubEmbedView.propTypes = {
    loaded: PropTypes.bool.isRequired
};

export default GithubEmbedView;
