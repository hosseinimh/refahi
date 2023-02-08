import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { addPlaceTypePage as strings } from "../../../../constants/strings";
import { addPlaceTypeSchema as schema } from "../../../validations";
import { placeTypes } from "../../../../constants";

const AddPlaceType = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm
            page={"PlaceTypes"}
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
                items={placeTypes}
                keyItem={"id"}
                valueItem={"value"}
            />
        </SubmitCancelForm>
    );
};

export default AddPlaceType;
