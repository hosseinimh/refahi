import React from "react";

const Modal = ({ id, children }) => {
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex={"-1"}
            aria-labelledby={id}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
