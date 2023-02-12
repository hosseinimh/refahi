import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputTextColumn, FormPage } from "../../../components";
import * as funcs from "./funcs";
import { addMciCenterPage as strings } from "../../../../constants/strings";
import { addMciCenterSchema as schema } from "../../../validations";

const AddMciCenter = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormPage
            page={"Provinces"}
            strings={strings}
            useForm={form}
            funcs={funcs}
        >
            <InputTextColumn
                field="name"
                columnClassName="col-md-8 col-sm-12 pb-4"
            />
            <InputTextColumn
                field="tel"
                columnClassName="col-md-4 col-sm-12 pb-4"
            />
            <InputTextColumn field="address" columnClassName="col-12 pb-4" />
            <InputTextColumn field="longitude" type="number" />
            <InputTextColumn field="latitude" type="number" />
        </FormPage>
    );
};

export default AddMciCenter;
