import PropTypes from "prop-types";
import "./Skeleton.css";

const Skeleton = ({
    width = "100%",
    height = "20px",
    className = "",
}) => {
    return (
        <div
            className={`ss-skeleton ${className}`}
            style={{ width, height }}
        />
    );
};

Skeleton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
};

export default Skeleton;