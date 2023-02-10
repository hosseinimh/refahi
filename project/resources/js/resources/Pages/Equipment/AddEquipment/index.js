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
    const ls = useSelector((state) => state.layoutReducer);
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm page={"Equipments"} funcs={funcs} useForm={form}>
            <InputSelectColumn
                field="equipmentType"
                size={5}
                columnClassName={"col-md-6 col-sm-12 pb-4"}
                strings={strings}
                items={equipmentTypes}
                handleChange={(e) => funcs.onChange(e)}
                selectedValues={ls?.pageProps?.type}
            />
            <InputSelectColumn
                field="type"
                useForm={form}
                size={5}
                columnClassName={"col-md-6 col-sm-12 pb-4"}
                strings={strings}
                items={ls?.pageProps?.equipmentTypes}
                valueItem={"name"}
            />
            <InputTextColumn
                field="name"
                useForm={form}
                strings={strings}
                columnClassName="col-md-6 col-sm-12 pb-4"
            />
            <InputTextColumn
                field="assetNo"
                useForm={form}
                strings={strings}
                columnClassName="col-md-3 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
        </SubmitCancelForm>
    );
};

export default AddEquipment;
