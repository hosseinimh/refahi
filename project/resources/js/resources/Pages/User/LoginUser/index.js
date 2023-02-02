import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFileEarmarkLock2, BsPhone } from "react-icons/bs";

import { InputTextColumn } from "../../../components";
import * as funcs from "./funcs";
import { loginUserPage as strings } from "../../../../constants/strings";
import { loginUserSchema as schema } from "../../../validations";
import LoginPage from "../../_layout/LoginPage";

const LoginUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <LoginPage
            strings={strings}
            handleSubmit={handleSubmit}
            errors={errors}
            funcs={funcs}
        >
            <div className="row">
                <InputTextColumn
                    field="username"
                    register={register}
                    strings={strings}
                    columnClassName="col-12 pb-4"
                    icon={<BsPhone />}
                />
                <InputTextColumn
                    field="password"
                    type="password"
                    register={register}
                    strings={strings}
                    columnClassName="col-12 pb-4"
                    icon={<BsFileEarmarkLock2 />}
                />
            </div>
        </LoginPage>
    );
};

export default LoginUser;
