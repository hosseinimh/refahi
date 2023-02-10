import React from "react";
import { useSelector } from "react-redux";

const InputSwitchCheckboxColumn = ({
    field,
    useForm,
    strings,
    checked = false,
}) => {
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <div className="form-check form-switch">
            <input
                {...useForm.register(field)}
                className="form-check-input"
                id={field}
                type="checkbox"
                disabled={ls?.loading}
                defaultChecked={checked}
            />
            <label className="form-check-label" htmlFor={field}>
                {strings[field]}
            </label>
        </div>
    );
};

export default InputSwitchCheckboxColumn;
