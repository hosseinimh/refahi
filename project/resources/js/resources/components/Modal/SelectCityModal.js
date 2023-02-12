import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings";
import { InputSelectColumn, Modal } from "../";

const SelectCityModal = ({
    id,
    strings,
    useForm,
    funcs,
    provinces,
    cities,
    province = null,
    city = null,
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const [provinceCities, setProvinceCities] = useState([]);

    useEffect(() => {
        if (!cities) {
            return;
        }

        useForm.setValue("province", 11);
        onProvince(11);
        document
            .getElementById(id)
            .addEventListener("shown.coreui.modal", () => {
                const province = document.getElementById("province");
                province.focus();
                province.scrollTo(0, 230);

                const city = document.getElementById("modalCity");
                city.focus();
            });
    }, [cities]);

    useEffect(() => {
        if (province) {
            useForm?.setValue("province", province);
        }
        console.log(city);
        if (city) {
            console.log(city);
            //useForm?.setValue("modalCity", city);
        }
    }, []);

    const onProvince = (id) => {
        setProvinceCities(cities.filter((city) => city.provinceId == id));
    };

    return (
        <Modal id={id}>
            <div className="modal-header">
                <h5 className="modal-title">{strings.modalTitle}</h5>
                <button
                    className="btn-close"
                    type="button"
                    data-coreui-dismiss="modal"
                    aria-label="Close"
                    disabled={ls?.loading}
                ></button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <InputSelectColumn
                        field="province"
                        size={5}
                        columnClassName={"col-md-6 col-sm-12 pb-4"}
                        items={provinces}
                        valueItem={"name"}
                        useForm={useForm}
                        selectedValues={"11"}
                        handleChange={(e) => onProvince(e.target.value)}
                    />
                    <InputSelectColumn
                        field="modalCity"
                        size={5}
                        columnClassName={"col-md-6 col-sm-12 pb-4"}
                        items={provinceCities}
                        valueItem={"name"}
                        useForm={useForm}
                        selectedValues={"137"}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button
                    title={strings.modalOkButton}
                    className="btn btn-success"
                    type="button"
                    onClick={useForm.handleSubmit(funcs.onCitySubmit)}
                    disabled={ls?.loading}
                >
                    {strings.modalOkButton}
                </button>
                <button
                    className="btn btn-secondary"
                    type="button"
                    data-coreui-dismiss="modal"
                    disabled={ls?.loading}
                >
                    {general.cancel}
                </button>
            </div>
        </Modal>
    );
};

export default SelectCityModal;
