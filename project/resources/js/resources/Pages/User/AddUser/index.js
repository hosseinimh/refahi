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
    const ls = useSelector((state) => state.layoutReducer);
    const form = useForm({
        resolver: yupResolver(schema),
    });

    const selectCityUseForm = useForm({
        resolver: yupResolver(selectCitySchema),
    });

    return (
        <SubmitCancelForm
            page={"Users"}
            funcs={funcs}
            useForm={form}
            modals={[{ id: "select-city-modal", useForm: selectCityUseForm }]}
        >
            <InputTextColumn
                field="username"
                useForm={form}
                strings={strings}
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="password"
                type="password"
                useForm={form}
                strings={strings}
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                useForm={form}
                strings={strings}
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="name"
                useForm={form}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
            />
            <InputTextColumn
                field="family"
                useForm={form}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
            />
            <InputTextColumn
                field="nationalCode"
                useForm={form}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                type="number"
                field="mobile"
                useForm={form}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="email"
                useForm={form}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.gender}</label>
                <InputRadioColumn
                    field="male"
                    name="gender"
                    useForm={form}
                    setValue={setValue}
                    strings={strings}
                    checked={true}
                />
                <InputRadioColumn
                    field="female"
                    name="gender"
                    useForm={form}
                    setValue={setValue}
                    strings={strings}
                />
            </div>
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.status}</label>
                <InputSwitchCheckboxColumn
                    field="active"
                    useForm={form}
                    strings={strings}
                    checked={true}
                />
            </div>
            <div className="col-md-6 col-sm-12 pb-4">
                <label className="form-label">{strings.type}</label>
                <InputRadioColumn
                    field="administrator"
                    name="type"
                    useForm={form}
                    setValue={setValue}
                    strings={strings}
                    checked={true}
                    onChange={(e) => funcs.onType("administrator")}
                />
                <InputRadioColumn
                    field="user"
                    name="type"
                    useForm={form}
                    setValue={setValue}
                    strings={strings}
                    onChange={(e) => funcs.onType("user")}
                />
            </div>
            <input type="hidden" {...register(`city`)} />
            {ls?.pageProps?.userType === USER_ROLES.USER && (
                <>
                    <div className="col-md-6 col-sm-12 pb-4">
                        <label className="form-label d-block">
                            {strings.selectCity}
                        </label>
                        {!ls?.pageProps?.city && (
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
                        {ls?.pageProps?.city && (
                            <>
                                <span className="ml-2">
                                    {ls?.pageProps?.city?.name}
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
                    <InputTextColumn
                        type="number"
                        field="personnelNo"
                        useForm={form}
                        strings={strings}
                        inputStyle={{ textAlign: "left" }}
                    />
                </>
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
