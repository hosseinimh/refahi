import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputSelectColumn = ({
    field,
    items,
    keyItem = "id",
    valueItem = "value",
    useForm,
    strings,
    handleChange,
    selectStyle = {},
    size = 1,
    columnClassName = "col-md-3 col-12 pb-4",
    noSelect = false,
    multiple = false,
    selectedValues = null,
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                ls?.pageProps?.strings && field in ls.pageProps.strings
                    ? ls?.pageProps?.strings[field]
                    : ""
            );
        }

        if (!useForm) {
            setForm(ls?.pageProps?.useForm);
        }
    }, [ls]);

    useEffect(() => {
        if (selectedValues) {
            form?.setValue(field, selectedValues);
        }
    }, [items]);

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {label}
            </label>
            <select
                id={field}
                style={{ ...selectStyle }}
                multiple={multiple}
                size={size}
                {...form?.register(field)}
                className={
                    ms?.messageField === field
                        ? "form-select is-invalid"
                        : "form-select"
                }
                aria-label={`select ${field}`}
                disabled={ls?.loading}
                onChange={(e) => {
                    if (handleChange) handleChange(e);
                }}
            >
                {noSelect && <option value="">-------</option>}
                {items?.map((item, index) => (
                    <option value={item[keyItem]} key={index}>
                        {item[valueItem]}
                    </option>
                ))}
            </select>
            {ms?.messageField === field && (
                <div className="invalid-feedback">{ms?.message}</div>
            )}
        </div>
    );
};

export default InputSelectColumn;
