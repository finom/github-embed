import FrameHTML from '../FrameHTML';
import FrameCode from '../FrameCode';
export default ({
    types
}) => (<div className="github-embed-frames">
    {types.map((type, index) => type === 'htmlpage' ?
        <FrameHTML key={index} index={index} /> :
        <FrameCode key={index} index={index} />)}
</div>);
