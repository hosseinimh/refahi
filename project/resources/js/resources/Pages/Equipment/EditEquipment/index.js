import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    FormPage,
} from "../../../components";
import * as funcs from "./funcs";
import { addEquipmentPage as strings } from "../../../../constants/strings";
import { addEquipmentSchema as schema } from "../../../validations";
import { equipmentTypes } from "../../../../constants";

const EditEquipment = () => {
    const ls = useSelector((state) => state.layoutReducer);
    const form = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        form.setValue("type", ls?.pageProps?.type);
    }, [ls]);

    return (
        <FormPage
            page={"Equipments"}
            strings={strings}
            funcs={funcs}
            useForm={form}
        >
            <InputSelectColumn
                field="equipmentType"
                size={5}
                columnClassName={"col-md-6 col-sm-12 pb-4"}
                items={equipmentTypes}
                handleChange={(e) => funcs.onChange(e?.target?.value)}
            />
            <InputSelectColumn
                field="type"
                size={5}
                columnClassName={"col-md-6 col-sm-12 pb-4"}
                items={ls?.pageProps?.equipmentTypes}
                valueItem={"name"}
            />
            <InputTextColumn
                field="name"
                columnClassName="col-md-6 col-sm-12 pb-4"
            />
            <InputTextColumn
                field="assetNo"
                columnClassName="col-md-3 col-sm-12 pb-4"
                inputStyle={{ textAlign: "left" }}
            />
        </FormPage>
    );
};

export default EditEquipment;
