import PropTypes from "prop-types";
import "./EmptyState.css";

const EmptyState = ({
    title,
    description,
    illustration = null,
    action = null,
    className = "",
}) => {
    return (
        <div className={`ss-empty-state ${className}`}>
            {illustration && (
                <div className="ss-empty-state__illustration">
                    {illustration}
                </div>
            )}

            <h3 className="ss-empty-state__title">{title}</h3>

            {description && (
                <p className="ss-empty-state__description">
                    {description}
                </p>
            )}

            {action && (
                <div className="ss-empty-state__action">
                    {action}
                </div>
            )}
        </div>
    );
};

EmptyState.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    illustration: PropTypes.node,
    action: PropTypes.node,
    className: PropTypes.string,
};

export default EmptyState;