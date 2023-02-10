import React from "react";
import { useSelector } from "react-redux";

const InputFileColumn = ({
    field,
    accept = ".jpg, .jpeg, .png, .pdf, .doc, .docx",
    placeholder = null,
    onChangeFile,
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
            <input
                {...useForm.register(`${field}`)}
                className={
                    ms?.messageField === field
                        ? "form-control is-invalid"
                        : "form-control"
                }
                id={field}
                placeholder={placeholder}
                disabled={ls?.loading}
                type="file"
                accept={accept}
                onChange={(e) => onChangeFile(e)}
            />
            {ms?.messageField === field && (
                <div className="invalid-feedback">{ms?.message}</div>
            )}
        </div>
    );
};

export default InputFileColumn;
