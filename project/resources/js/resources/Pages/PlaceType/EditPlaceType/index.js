import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputSelectColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { editPlaceTypePage as strings } from "../../../../constants/strings";
import { editPlaceTypeSchema as schema } from "../../../validations";
import { placeTypes } from "../../../../constants";

const EditPlaceType = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm page={"PlaceTypes"} funcs={funcs} useForm={form}>
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
                items={placeTypes}
            />
        </SubmitCancelForm>
    );
};

export default EditPlaceType;
