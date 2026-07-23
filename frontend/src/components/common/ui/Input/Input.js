import PropTypes from "prop-types";
import "./Input.css";

const Input = ({
    label,
    name,
    type = "text",
    value,
    placeholder = "",
    error = "",
    helperText = "",
    required = false,
    disabled = false,
    fullWidth = true,
    className = "",
    onChange,
    onBlur,
}) => {

    return (
        <div
            className={`ss-input-group ${fullWidth ? "ss-input-group--full" : ""} ${className}`}
        >

            {label && (
                <label
                    htmlFor={name}
                    className="ss-input-label"
                >
                    {label}

                    {required && (
                        <span className="ss-required">*</span>
                    )}

                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                className={`ss-input ${error ? "ss-input--error" : ""}`}
                onChange={onChange}
                onBlur={onBlur}
            />

            {error ? (
                <p className="ss-input-error">
                    {error}
                </p>
            ) : (
                helperText && (
                    <p className="ss-input-helper">
                        {helperText}
                    </p>
                )
            )}

        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    placeholder: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

export default Input;