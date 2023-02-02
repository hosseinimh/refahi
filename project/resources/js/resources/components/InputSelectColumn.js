import React from "react";
import { useSelector } from "react-redux";

const InputSelectColumn = ({
    field,
    items,
    keyItem,
    valueItem,
    register = null,
    strings,
    handleChange,
    selectStyle = {},
    size = 1,
    columnClassName = "col-12 pb-4",
    noSelect = false,
    multiple = false,
    selectedValues,
}) => {
    const _ls = useSelector((state) => state.layoutReducer);
    const _ms = useSelector((state) => state.messageReducer);

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            <select
                style={{ ...selectStyle }}
                multiple={multiple}
                size={size}
                defaultValue={multiple ? [...selectedValues] : selectedValues}
                {...(register instanceof Function && register(field))}
                className={
                    _ms?.messageField === field
                        ? "form-select is-invalid"
                        : "form-select"
                }
                aria-label={`select ${field}`}
                disabled={_ls?.loading}
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
            {_ms?.messageField === field && (
                <div className="invalid-feedback">{_ms?.message}</div>
            )}
        </div>
    );
};

export default InputSelectColumn;
