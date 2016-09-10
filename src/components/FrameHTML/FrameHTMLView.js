export default ({
    shown,
    loaded,
    url: src,
    onLoad
}) => (<iframe {...(loaded ? { src } : {})} style={{
    display: shown ? '' : 'none'
}} onLoad={onLoad}
/>);
