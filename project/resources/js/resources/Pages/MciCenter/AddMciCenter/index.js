import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputTextColumn, SubmitCancelForm } from "../../../components";
import * as funcs from "./funcs";
import { addMciCenterPage as strings } from "../../../../constants/strings";
import { addMciCenterSchema as schema } from "../../../validations";

const AddMciCenter = () => {
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
            page={"Provinces"}
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
            <InputTextColumn
                field="tel"
                register={register}
                strings={strings}
            />
            <InputTextColumn
                field="address"
                register={register}
                strings={strings}
                columnClassName="col-12 pb-4"
            />
            <InputTextColumn
                field="longitude"
                type="number"
                register={register}
                strings={strings}
            />
            <InputTextColumn
                field="latitude"
                type="number"
                register={register}
                strings={strings}
            />
        </SubmitCancelForm>
    );
};

export default AddMciCenter;
