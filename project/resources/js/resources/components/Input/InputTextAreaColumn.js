import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { MESSAGE_CODES } from "../../../constants";

const InputTextAreaColumn = ({
    field,
    placeholder = null,
    useForm,
    columnClassName = "col-12 pb-4",
    strings,
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);

    placeholder = placeholder ? placeholder : strings[`${field}Placeholder`];

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            <textarea
                {...useForm.register(field)}
                className={
                    ms?.messageField === field
                        ? "form-control is-invalid"
                        : "form-control"
                }
                id={field}
                placeholder={placeholder}
                disabled={ls?.loading}
            />
            {ms?.messageField === field && (
                <div className="invalid-feedback">{ms?.message}</div>
            )}
        </div>
    );
};

export default InputTextAreaColumn;
