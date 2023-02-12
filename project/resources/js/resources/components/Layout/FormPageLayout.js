import React from "react";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";

const FormPageLayout = ({
    children,
    page,
    strings,
    funcs,
    useForm,
    modals,
}) => {
    return (
        <BasePageLayout
            page={page}
            strings={strings}
            funcs={funcs}
            useForm={useForm}
            modals={modals}
        >
            <div className="body flex-grow-1 px-3">
                <div className="container-lg">
                    <AlertState />
                    {children}
                </div>
            </div>
        </BasePageLayout>
    );
};

export default FormPageLayout;
