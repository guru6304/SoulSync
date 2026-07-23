import PropTypes from "prop-types";
import "./Avatar.css";

const Avatar = ({
    src,
    alt = "Avatar",
    name = "User",
    size = "md",
    bordered = false,
    clickable = false,
    className = "",
    onClick,
}) => {

    const initials = name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map(word => word[0])
        .join("")
        .toUpperCase();

    const classes = [
        "ss-avatar",
        `ss-avatar--${size}`,
        bordered && "ss-avatar--bordered",
        clickable && "ss-avatar--clickable",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            onClick={onClick}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="ss-avatar__image"
                />
            ) : (
                <span className="ss-avatar__initials">
                    {initials || "?"}
                </span>
            )}
        </div>
    );
};

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
        "xl",
    ]),
    bordered: PropTypes.bool,
    clickable: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Avatar;