import classNames from 'classnames';
import { PropTypes } from 'react';

const HeaderView = ({
    items,
    onLabelClick
}) => (<nav className="github-embed-nav">
    {items.map(({ shown, label }, index) =>
        <a
            className={classNames({
                'github-embed-nav-link': true,
                'github-embed-nav-link-shown': shown
            })}
            key={index}
            onClick={() => onLabelClick(index)}
        >
            {label}
        </a>
    )}
</nav>);

HeaderView.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        shown: PropTypes.boolean.isRequired
    })),
    onLabelClick: PropTypes.func.isRequired
};

export default HeaderView;
