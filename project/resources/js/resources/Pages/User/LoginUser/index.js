import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFileEarmarkLock2, BsPhone } from "react-icons/bs";

import { InputTextColumn, LoginPageLayout } from "../../../components";
import * as funcs from "./funcs";
import { loginUserPage as strings } from "../../../../constants/strings";
import { loginUserSchema as schema } from "../../../validations";

const LoginUser = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <LoginPageLayout
            page={"Users"}
            strings={strings}
            useForm={form}
            funcs={funcs}
        >
            <div className="row">
                <InputTextColumn
                    field="username"
                    columnClassName="col-12 pb-4"
                    icon={<BsPhone />}
                />
                <InputTextColumn
                    field="password"
                    type="password"
                    columnClassName="col-12 pb-4"
                    icon={<BsFileEarmarkLock2 />}
                />
            </div>
        </LoginPageLayout>
    );
};

export default LoginUser;
