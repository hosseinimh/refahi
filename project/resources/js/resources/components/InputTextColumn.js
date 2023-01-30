import React from "react";
import { useSelector } from "react-redux";

const InputTextColumn = ({
    field,
    type = "text",
    placeholder = null,
    register,
    columnClassName = "col-12 pb-4",
    strings,
}) => {
    const _ls = useSelector((state) => state.layoutReducer);
    const _ms = useSelector((state) => state.messageReducer);

    placeholder = placeholder ? placeholder : strings[`${field}Placeholder`];

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            <input
                {...register(`${field}`)}
                className={
                    _ms?.messageField === field
                        ? "form-control is-invalid"
                        : "form-control"
                }
                id={field}
                placeholder={placeholder}
                disabled={_ls?.loading}
                type={type}
            />
            {_ms?.messageField === field && (
                <div className="invalid-feedback">{_ms?.message}</div>
            )}
        </div>
    );
};

export default InputTextColumn;
