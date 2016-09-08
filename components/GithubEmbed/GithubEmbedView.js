import Loader from 'react-loader';
import Header from '../Header';
import Footer from '../Footer';
import Frames from '../Frames';

export default ({
    loaded
}) => (<div className="github-embed-main">
    <Header />
    <Frames />
    <Footer />
    <Loader loaded={loaded} />
</div>);
