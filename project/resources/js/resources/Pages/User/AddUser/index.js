import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputRadioColumn,
    InputSwitchCheckboxColumn,
    InputTextColumn,
    SelectCityModal,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import {
    addUserPage as strings,
    general,
    selectCityModal,
} from "../../../../constants/strings";
import {
    addUserSchema as schema,
    selectCitySchema,
} from "../../../validations";
import { USER_ROLES, vendorsPath } from "../../../../constants";

const AddUser = () => {
    const _ls = useSelector((state) => state.layoutReducer);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const selectCityUseForm = useForm({
        resolver: yupResolver(selectCitySchema),
    });

    return (
        <SubmitCancelForm
            page={"Users"}
            funcs={funcs}
            setValue={setValue}
            handleSubmit={handleSubmit}
            errors={errors}
            modals={[{ id: "select-city-modal", useForm: selectCityUseForm }]}
        >
            <InputTextColumn
                field="username"
                register={register}
                strings={strings}
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="password"
                type="password"
                register={register}
                strings={strings}
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                register={register}
                strings={strings}
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="name"
                register={register}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
            />
            <InputTextColumn
                field="family"
                register={register}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
            />
            <InputTextColumn
                type="number"
                field="nationalCode"
                register={register}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                type="number"
                field="mobile"
                register={register}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="email"
                register={register}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.gender}</label>
                <InputRadioColumn
                    field="male"
                    name="gender"
                    register={register}
                    setValue={setValue}
                    strings={strings}
                    checked={true}
                />
                <InputRadioColumn
                    field="female"
                    name="gender"
                    register={register}
                    setValue={setValue}
                    strings={strings}
                />
            </div>
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.status}</label>
                <InputSwitchCheckboxColumn
                    field="active"
                    register={register}
                    strings={strings}
                    checked={true}
                />
            </div>
            <div className="col-md-6 col-sm-12 pb-4">
                <label className="form-label">{strings.type}</label>
                <InputRadioColumn
                    field="administrator"
                    name="type"
                    register={register}
                    setValue={setValue}
                    strings={strings}
                    checked={true}
                    onChange={funcs.onType}
                />
                <InputRadioColumn
                    field="user"
                    name="type"
                    register={register}
                    setValue={setValue}
                    strings={strings}
                    onChange={funcs.onType}
                />
            </div>
            <input type="hidden" {...register(`city`)} />
            {_ls?.pageProps?.userType === USER_ROLES.USER && (
                <div className="col-md-6 col-sm-12 pb-4">
                    <label className="form-label d-block">
                        {strings.selectCity}
                    </label>
                    {!_ls?.pageProps?.city && (
                        <button
                            className="btn btn-link"
                            type="button"
                            onClick={funcs.onSelectCity}
                        >
                            <svg className="icon me-2">
                                <use
                                    xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-plus`}
                                    style={{ color: "green" }}
                                ></use>
                            </svg>
                            {strings.noCity}
                        </button>
                    )}
                    {_ls?.pageProps?.city && (
                        <>
                            <span className="ml-2">
                                {_ls?.pageProps?.city?.name}
                            </span>
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={funcs.onRemoveCity}
                            >
                                <svg className="icon me-2">
                                    <use
                                        xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-x`}
                                        style={{ color: "red" }}
                                    ></use>
                                </svg>
                                {general.remove}
                            </button>
                        </>
                    )}
                </div>
            )}
            <SelectCityModal
                id="select-city-modal"
                strings={selectCityModal}
                useForm={selectCityUseForm}
                funcs={funcs}
            />
        </SubmitCancelForm>
    );
};

export default AddUser;
