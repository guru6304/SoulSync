import PropTypes from "prop-types";
import "./SectionHeader.css";

const SectionHeader = ({
    title,
    subtitle,
    actionLabel,
    onActionClick,
    className = "",
}) => {

    return (

        <div className={`ss-section-header ${className}`}>

            <div>

                <h2 className="ss-section-title">

                    {title}

                </h2>

                {

                    subtitle && (

                        <p className="ss-section-subtitle">

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {

                actionLabel && (

                    <button
                        type="button"
                        className="ss-section-action"
                        onClick={onActionClick}
                    >

                        {actionLabel}

                    </button>

                )

            }

        </div>

    );

};

SectionHeader.propTypes = {

    title: PropTypes.string.isRequired,

    subtitle: PropTypes.string,

    actionLabel: PropTypes.string,

    onActionClick: PropTypes.func,

    className: PropTypes.string,

};

export default SectionHeader;