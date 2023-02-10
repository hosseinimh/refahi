import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { MESSAGE_TYPES } from "../../../constants";
import utils from "../../../utils/Utils";

const AlertState = () => {
    const ms = useSelector((state) => state.messageReducer);
    const [message, setMessage] = useState(null);
    const [code, setCode] = useState(0);
    const [type, setType] = useState(0);

    useEffect(() => {
        if (
            ms?.messageType === MESSAGE_TYPES.ERROR ||
            ms?.messageType === MESSAGE_TYPES.SUCCESS
        ) {
            try {
                if (ms?.message) {
                    if (ms?.messageRender) {
                        setMessage(utils.en2faDigits(ms?.message.toString()));
                        setCode(utils.en2faDigits(ms?.messageCode.toString()));
                        setType(ms?.messageType);
                    }
                }
            } catch {}
        } else {
            setMessage(null);
        }
    }, [ms]);

    if (message) {
        return (
            <div
                className={`alert ${
                    type === MESSAGE_TYPES.ERROR
                        ? "alert-danger"
                        : "alert-success"
                }`}
                role="alert"
            >
                {`${message} (${code}) `}
            </div>
        );
    }

    return <></>;
};

export default AlertState;
