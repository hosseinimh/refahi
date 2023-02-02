import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputTextColumn, SubmitCancelForm } from "../../../components";
import * as funcs from "./funcs";
import { changePasswordUserPage as strings } from "../../../../constants/strings";
import { changePasswordUserSchema as schema } from "../../../validations";

const ChangePasswordUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm
            page={"Users"}
            funcs={funcs}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputTextColumn
                field="newPassword"
                type="password"
                register={register}
                strings={strings}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                register={register}
                strings={strings}
            />
        </SubmitCancelForm>
    );
};

export default ChangePasswordUser;
