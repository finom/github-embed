import classNames from 'classnames';

export default ({
    items,
    onLabelClick
}) => (<nav className="github-embed-nav">
    {items.map(({ shown, label }, index) =>
        <a className={classNames({
            'github-embed-nav-link': true,
            'github-embed-nav-link-shown': shown
        })} key={index} onClick={() => onLabelClick(index)}>
            {label}
        </a>
    )}
</nav>);
