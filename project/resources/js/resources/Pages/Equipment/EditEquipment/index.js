import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { addEquipmentPage as strings } from "../../../../constants/strings";
import { addEquipmentSchema as schema } from "../../../validations";
import { equipmentTypes } from "../../../../constants";

const EditEquipment = () => {
    const _ls = useSelector((state) => state.layoutReducer);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setValue("type", _ls?.pageProps?.type);
    }, [_ls]);

    return (
        <SubmitCancelForm
            page={"Equipments"}
            funcs={funcs}
            setValue={setValue}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputSelectColumn
                register={register}
                field="equipmentType"
                size={5}
                columnClassName={"col-md-6 col-sm-12 pb-4"}
                strings={strings}
                items={equipmentTypes}
                keyItem={"id"}
                valueItem={"value"}
                handleChange={(e) => funcs.onChange(e?.target?.value)}
            />
            <InputSelectColumn
                field="type"
                register={register}
                size={5}
                columnClassName={"col-md-6 col-sm-12 pb-4"}
                strings={strings}
                items={_ls?.pageProps?.equipmentTypes}
                keyItem={"id"}
                valueItem={"name"}
            />
            <InputTextColumn
                field="name"
                register={register}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
            />
            <InputTextColumn
                field="assetNo"
                register={register}
                strings={strings}
                columnClassName="col-md-3 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
        </SubmitCancelForm>
    );
};

export default EditEquipment;
