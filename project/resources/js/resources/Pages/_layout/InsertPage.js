import React from "react";

import { AlertState } from "../../components";
import BasePage from "./BasePage";

const InsertPage = ({ children, page, errors = null }) => {
    return (
        <BasePage page={page} errors={errors}>
            <div className="body flex-grow-1 px-3">
                <div className="container-lg">
                    <AlertState />
                    {children}
                </div>
            </div>
        </BasePage>
    );
};

export default InsertPage;
