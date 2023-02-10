import React, { useEffect } from "react";
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
    columnClassName = "col-md-4 col-sm-12 pb-4",
    noSelect = false,
    multiple = false,
    selectedValues = null,
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);

    useEffect(() => {
        if (selectedValues) {
            useForm.setValue(field, selectedValues);
        }
    }, [items]);

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            <select
                id={field}
                style={{ ...selectStyle }}
                multiple={multiple}
                size={size}
                {...useForm.register(field)}
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
