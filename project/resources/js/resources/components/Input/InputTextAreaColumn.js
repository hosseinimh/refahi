import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputTextAreaColumn = ({
    field,
    useForm,
    columnClassName = "col-md-3 col-12 pb-4",
    strings,
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${field}Placeholder` in strings
            ? strings[`${field}Placeholder`]
            : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                ls?.pageProps?.strings && field in ls.pageProps.strings
                    ? ls?.pageProps?.strings[field]
                    : ""
            );
            setPlaceholder(
                ls?.pageProps?.strings &&
                    `${field}Placeholder` in ls.pageProps.strings
                    ? ls.pageProps.strings[`${field}Placeholder`]
                    : ""
            );
        }

        if (!useForm) {
            setForm(ls?.pageProps?.useForm);
        }
    }, [ls]);

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {label}
            </label>
            <textarea
                {...form?.register(field)}
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
