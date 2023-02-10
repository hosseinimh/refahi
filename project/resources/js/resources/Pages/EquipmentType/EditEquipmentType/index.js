import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { editEquipmentTypePage as strings } from "../../../../constants/strings";
import { editEquipmentTypeSchema as schema } from "../../../validations";
import { equipmentTypes } from "../../../../constants";

const EditEquipmentType = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm page={"EquipmentTypes"} useForm={form} funcs={funcs}>
            <InputTextColumn
                field="name"
                useForm={form}
                strings={strings}
                columnClassName="col-md-8 col-sm-12 pb-4"
            />
            <InputSelectColumn
                field="type"
                useForm={form}
                strings={strings}
                items={equipmentTypes}
            />
        </SubmitCancelForm>
    );
};

export default EditEquipmentType;
