import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const InputRadioColumn = ({
    field,
    name,
    register,
    setValue,
    strings,
    checked = false,
    onChange = null,
}) => {
    const _ls = useSelector((state) => state.layoutReducer);

    useEffect(() => {
        if (checked) {
            setValue(field, "on");
        }
    }, []);

    return (
        <div className="form-check">
            <input
                {...register(field)}
                className="form-check-input"
                id={field}
                name={name}
                type="radio"
                disabled={_ls?.loading}
                onChange={(e) => {
                    document
                        .querySelectorAll(`[name="${name}"]`)
                        .forEach((node) => {
                            if (node.id !== field) {
                                setValue(node.id, null);
                            }
                        });

                    e.target.checked
                        ? setValue(field, "on")
                        : setValue(field, null);

                    if (onChange) {
                        onChange(e, field);
                    }
                }}
            />
            <label className="form-check-label" htmlFor={field}>
                {strings[field]}
            </label>
        </div>
    );
};

export default InputRadioColumn;
