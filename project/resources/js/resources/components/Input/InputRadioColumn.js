import React, { useState, useEffect } from "react";
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
        if (checked) {
            form?.setValue(field, "on");
        }
    }, [form]);

    return (
        <div className="form-check">
            <input
                {...form?.register(field)}
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
                                form?.setValue(node.id, null);
                            }
                        });

                    e.target.checked
                        ? form?.setValue(field, "on")
                        : form?.setValue(field, null);

                    if (onChange) {
                        onChange(e, field);
                    }
                }}
            />
            <label className="form-check-label" htmlFor={field}>
                {label}
            </label>
        </div>
    );
};

export default InputRadioColumn;
