import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { general } from "../../constants/strings";
import { City, Province } from "../../http/entities";
import { setLoadingAction } from "../../state/layout/layoutActions";
import InputSelectColumn from "./InputSelectColumn";
import Modal from "./Modal";

const SelectCityModal = ({ id, strings, useForm, funcs }) => {
    const _ls = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        useForm.setValue("province", 11);
        fetchCities(11);
    }, [provinces]);

    useEffect(() => {
        document
            .getElementById(id)
            .addEventListener("shown.coreui.modal", () => {
                const province = document.getElementById("province");
                province.focus();
                province.scrollTo(0, 230);

                const city = document.getElementById("city");
                city.focus();
                useForm.setValue("city", city.options[0].value);
            });

        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        dispatch(setLoadingAction(true));

        const province = new Province();
        let result = await province.getAll();

        if (result !== null) {
            setProvinces(result.items);
        }

        dispatch(setLoadingAction(false));
    };

    const fetchCities = async (provinceId) => {
        dispatch(setLoadingAction(true));

        const city = new City();
        let result = await city.getAll(provinceId);

        if (result !== null) {
            setCities(result.items);
        }

        dispatch(setLoadingAction(false));
    };

    const onProvince = (e) => {
        fetchCities(e?.target?.value);
    };

    return (
        <Modal id={id} errors={useForm.formState.errors}>
            <div className="modal-header">
                <h5 className="modal-title">{strings.modalTitle}</h5>
                <button
                    className="btn-close"
                    type="button"
                    data-coreui-dismiss="modal"
                    aria-label="Close"
                    disabled={_ls?.loading}
                ></button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <InputSelectColumn
                        field="province"
                        size={5}
                        columnClassName={"col-md-6 col-sm-12 pb-4"}
                        strings={strings}
                        register={useForm.register}
                        setValue={useForm.setValue}
                        items={provinces}
                        keyItem={"id"}
                        valueItem={"name"}
                        selectedValues={"11"}
                        handleChange={onProvince}
                    />
                    <InputSelectColumn
                        field="city"
                        size={5}
                        columnClassName={"col-md-6 col-sm-12 pb-4"}
                        strings={strings}
                        register={useForm.register}
                        setValue={useForm.setValue}
                        items={cities}
                        keyItem={"id"}
                        valueItem={"name"}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button
                    title={strings.modalOkButton}
                    className="btn btn-success"
                    type="button"
                    onClick={useForm.handleSubmit(funcs.onCitySubmit)}
                    disabled={_ls?.loading}
                >
                    {strings.modalOkButton}
                </button>
                <button
                    className="btn btn-secondary"
                    type="button"
                    data-coreui-dismiss="modal"
                    disabled={_ls?.loading}
                >
                    {general.cancel}
                </button>
            </div>
        </Modal>
    );
};

export default SelectCityModal;
