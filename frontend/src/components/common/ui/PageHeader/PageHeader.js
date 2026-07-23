import PropTypes from "prop-types";
import "./PageHeader.css";

const PageHeader = ({
    title,
    subtitle,
    action = null,
    className = "",
}) => {

    return (

        <header className={`ss-page-header ${className}`}>

            <div className="ss-page-header__content">

                <h1 className="ss-page-header__title">

                    {title}

                </h1>

                {

                    subtitle && (

                        <p className="ss-page-header__subtitle">

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {

                action && (

                    <div className="ss-page-header__action">

                        {action}

                    </div>

                )

            }

        </header>

    );

};

PageHeader.propTypes = {

    title: PropTypes.string.isRequired,

    subtitle: PropTypes.string,

    action: PropTypes.node,

    className: PropTypes.string,

};

export default PageHeader;