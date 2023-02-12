import React from "react";

import { PageLayout } from "../";

const BlankPage = ({ page, strings, funcs, useForm, children }) => {
    return (
        <PageLayout
            page={page}
            strings={strings}
            funcs={funcs}
            useForm={useForm}
        >
            {children}
        </PageLayout>
    );
};

export default BlankPage;
