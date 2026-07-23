import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
    children,
    className = "",
    onClick,
}) => {

    return (

        <div
            className={`ss-card ${className}`}
            onClick={onClick}
        >

            {children}

        </div>

    );

};

Card.propTypes = {

    children: PropTypes.node.isRequired,

    className: PropTypes.string,

    onClick: PropTypes.func,

};

Card.defaultProps = {

    className: "",

    onClick: undefined,

};

export default Card;