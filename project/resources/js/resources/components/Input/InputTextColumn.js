import React from "react";
import { useSelector } from "react-redux";

const InputTextColumn = ({
    field,
    type = "text",
    placeholder = null,
    useForm,
    columnClassName = "col-md-4 col-sm-12 pb-4",
    strings,
    icon = null,
    inputStyle = {},
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);

    placeholder = placeholder ? placeholder : strings[`${field}Placeholder`];

    const renderInput = () => (
        <>
            <input
                {...useForm.register(field)}
                className={
                    ms?.messageField === field
                        ? "form-control is-invalid"
                        : "form-control"
                }
                id={field}
                placeholder={placeholder}
                disabled={ls?.loading}
                type={type}
                style={{ ...inputStyle }}
            />
            {ms?.messageField === field && (
                <div className="invalid-feedback">{ms?.message}</div>
            )}
        </>
    );

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            {icon && (
                <div className="input-group has-validation mb-2">
                    <span className="input-group-text">{icon}</span>
                    {renderInput()}
                </div>
            )}
            {!icon && renderInput()}
        </div>
    );
};

export default InputTextColumn;
