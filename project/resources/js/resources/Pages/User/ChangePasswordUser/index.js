import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputTextColumn, SubmitCancelForm } from "../../../components";
import * as funcs from "./funcs";
import { changePasswordUserPage as strings } from "../../../../constants/strings";
import { changePasswordUserSchema as schema } from "../../../validations";

const ChangePasswordUser = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm page={"Users"} funcs={funcs} useForm={form}>
            <InputTextColumn
                field="newPassword"
                type="password"
                useForm={form}
                strings={strings}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                useForm={form}
                strings={strings}
            />
        </SubmitCancelForm>
    );
};

export default ChangePasswordUser;
