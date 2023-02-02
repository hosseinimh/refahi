import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { addEquipmentTypePage as strings } from "../../../../constants/strings";
import { addEquipmentTypeSchema as schema } from "../../../validations";
import { equipmentTypes } from "../../../../constants";

const AddEquipmentType = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm
            page={"EquipmentTypes"}
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
                items={equipmentTypes}
                keyItem={"id"}
                valueItem={"value"}
            />
        </SubmitCancelForm>
    );
};

export default AddEquipmentType;
