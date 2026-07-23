import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({
    isOpen,
    title,
    children,
    footer,
    onClose,
}) => {

    if (!isOpen) return null;

    return (

        <div
            className="ss-modal-overlay"
            onClick={onClose}
        >

            <div
                className="ss-modal"
                onClick={(e)=>e.stopPropagation()}
            >

                <div className="ss-modal-header">

                    <h2>{title}</h2>

                    <button
                        type="button"
                        className="ss-modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <div className="ss-modal-body">

                    {children}

                </div>

                {

                    footer && (

                        <div className="ss-modal-footer">

                            {footer}

                        </div>

                    )

                }

            </div>

        </div>

    );

};

Modal.propTypes={

isOpen:PropTypes.bool.isRequired,

title:PropTypes.string,

children:PropTypes.node,

footer:PropTypes.node,

onClose:PropTypes.func.isRequired,

};

export default Modal;