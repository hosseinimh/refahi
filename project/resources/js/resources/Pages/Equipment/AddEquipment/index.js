import React from "react";
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

const AddEquipment = () => {
    const _ls = useSelector((state) => state.layoutReducer);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm
            page={"Equipments"}
            funcs={funcs}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputSelectColumn
                field="equipmentType"
                size={5}
                columnClassName={"col-md-6 col-sm-12 pb-4"}
                strings={strings}
                items={types}
                keyItem={"id"}
                valueItem={"value"}
                handleChange={(e) => funcs.onChange(e)}
                selectedValues={_ls?.pageProps?.type}
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
                columnClassName="col-md-8 col-sm-12 pb-4"
            />
        </SubmitCancelForm>
    );
};

export default AddEquipment;
