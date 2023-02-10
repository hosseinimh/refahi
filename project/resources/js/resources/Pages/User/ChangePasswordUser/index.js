import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputTextColumn, FormPage } from "../../../components";
import * as funcs from "./funcs";
import { changePasswordUserPage as strings } from "../../../../constants/strings";
import { changePasswordUserSchema as schema } from "../../../validations";

const ChangePasswordUser = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormPage page={"Users"} strings={strings} funcs={funcs} useForm={form}>
            <InputTextColumn field="newPassword" type="password" />
            <InputTextColumn field="confirmPassword" type="password" />
        </FormPage>
    );
};

export default ChangePasswordUser;
