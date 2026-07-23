import PropTypes from "prop-types";
import "./Toast.css";

const Toast = ({
    message,
    variant="success",
}) => {
    return (
        <div className={`ss-toast ss-toast--${variant}`}>
            {message}
        </div>
    );
};

Toast.propTypes={
    message:PropTypes.string.isRequired,
    variant:PropTypes.oneOf([
        "success",
        "error",
        "warning",
        "info",
    ]),
};

export default Toast;