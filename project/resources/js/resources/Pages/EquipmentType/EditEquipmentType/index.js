import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import {
    editEquipmentTypePage as strings,
    equipmentTypes,
} from "../../../../constants/strings";
import { editEquipmentTypeSchema as schema } from "../../../validations";
import { EQUIPMENT_TYPES } from "../../../../constants";

const types = [
    { id: EQUIPMENT_TYPES.TYPE_1, value: equipmentTypes.type1 },
    { id: EQUIPMENT_TYPES.TYPE_2, value: equipmentTypes.type2 },
    { id: EQUIPMENT_TYPES.TYPE_3, value: equipmentTypes.type3 },
    { id: EQUIPMENT_TYPES.TYPE_4, value: equipmentTypes.type4 },
    { id: EQUIPMENT_TYPES.TYPE_5, value: equipmentTypes.type5 },
    { id: EQUIPMENT_TYPES.TYPE_6, value: equipmentTypes.type6 },
    { id: EQUIPMENT_TYPES.TYPE_7, value: equipmentTypes.type7 },
    { id: EQUIPMENT_TYPES.TYPE_8, value: equipmentTypes.type8 },
];

const EditEquipmentType = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm
            page={"EquipmentTypes"}
            setValue={setValue}
            funcs={funcs}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputTextColumn
                field="name"
                register={register}
                strings={strings}
                columnClassName="col-md-8 col-sm-12 pb-4"
            />
            <InputSelectColumn
                field="type"
                register={register}
                strings={strings}
                items={types}
                keyItem={"id"}
                valueItem={"value"}
            />
        </SubmitCancelForm>
    );
};

export default EditEquipmentType;
