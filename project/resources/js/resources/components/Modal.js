import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MESSAGE_CODES, MESSAGE_TYPES } from "../../constants";
import { setMessageAction } from "../../state/message/messageActions";

const Modal = ({ id, errors, children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof errors === "object" && errors) {
            const hasKeys = !!Object.keys(errors).length;

            if (hasKeys) {
                dispatch(
                    setMessageAction(
                        errors[Object.keys(errors)[0]].message,
                        MESSAGE_TYPES.ERROR,
                        MESSAGE_CODES.FORM_INPUT_INVALID,
                        true,
                        Object.keys(errors)[0]
                    )
                );
            }
        }
    }, [errors]);

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
