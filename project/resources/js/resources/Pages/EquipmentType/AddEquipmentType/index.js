import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    FormPage,
} from "../../../components";
import * as funcs from "./funcs";
import { addEquipmentTypePage as strings } from "../../../../constants/strings";
import { addEquipmentTypeSchema as schema } from "../../../validations";
import { equipmentTypes } from "../../../../constants";

const AddEquipmentType = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormPage
            page={"EquipmentTypes"}
            strings={strings}
            funcs={funcs}
            useForm={form}
        >
            <InputTextColumn
                field="name"
                columnClassName="col-md-8 col-sm-12 pb-4"
            />
            <InputSelectColumn field="type" items={equipmentTypes} />
        </FormPage>
    );
};

export default AddEquipmentType;
