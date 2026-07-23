import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    fullWidth = false,
    leftIcon = null,
    rightIcon = null,
    className = "",
    onClick,
}) => {

    const classes = [
        "ss-button",
        `ss-button--${variant}`,
        `ss-button--${size}`,
        fullWidth && "ss-button--full",
        loading && "ss-button--loading",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
        >

            {leftIcon && (
                <span className="ss-button__icon">
                    {leftIcon}
                </span>
            )}

            <span className="ss-button__text">
                {loading ? "Loading..." : children}
            </span>

            {rightIcon && !loading && (
                <span className="ss-button__icon">
                    {rightIcon}
                </span>
            )}

        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf([
        "button",
        "submit",
        "reset",
    ]),
    variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "outline",
        "ghost",
        "danger",
    ]),
    size: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
    ]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;