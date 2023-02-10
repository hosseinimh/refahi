import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputTextColumn, SubmitCancelForm } from "../../../components";
import * as funcs from "./funcs";
import { addMciCenterPage as strings } from "../../../../constants/strings";
import { addMciCenterSchema as schema } from "../../../validations";

const AddMciCenter = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm page={"Provinces"} useForm={form} funcs={funcs}>
            <InputTextColumn
                field="name"
                useForm={form}
                strings={strings}
                columnClassName="col-md-8 col-sm-12 pb-4"
            />
            <InputTextColumn field="tel" useForm={form} strings={strings} />
            <InputTextColumn
                field="address"
                useForm={form}
                strings={strings}
                columnClassName="col-12 pb-4"
            />
            <InputTextColumn
                field="longitude"
                type="number"
                useForm={form}
                strings={strings}
            />
            <InputTextColumn
                field="latitude"
                type="number"
                useForm={form}
                strings={strings}
            />
        </SubmitCancelForm>
    );
};

export default AddMciCenter;
