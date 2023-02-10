import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const InputRadioColumn = ({
    field,
    name,
    useForm,
    strings,
    checked = false,
    onChange = null,
}) => {
    const ls = useSelector((state) => state.layoutReducer);

    useEffect(() => {
        if (checked) {
            useForm.setValue(field, "on");
        }
    }, []);

    return (
        <div className="form-check">
            <input
                {...useForm.register(field)}
                className="form-check-input"
                id={field}
                name={name}
                type="radio"
                disabled={ls?.loading}
                onChange={(e) => {
                    document
                        .querySelectorAll(`[name="${name}"]`)
                        .forEach((node) => {
                            if (node.id !== field) {
                                useForm.setValue(node.id, null);
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
