import PropTypes from "prop-types";
import "./Badge.css";

const Badge = ({
    children,
    variant = "primary",
    size = "md",
    rounded = true,
    className = "",
}) => {

    const classes = [
        "ss-badge",
        `ss-badge--${variant}`,
        `ss-badge--${size}`,
        rounded && "ss-badge--rounded",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "outline",
    ]),
    size: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
    ]),
    rounded: PropTypes.bool,
    className: PropTypes.string,
};

export default Badge;