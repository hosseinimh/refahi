import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AlertState } from "../../components";
import BasePage from "./BasePage";
import { setPagePropsAction } from "../../../state/layout/layoutActions";

const Page = ({ children, page, strings, funcs, useForm }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPagePropsAction({ strings, useForm }));
    }, []);

    return (
        <BasePage page={page} funcs={funcs} errors={useForm?.formState?.errors}>
            <div className="body flex-grow-1 px-3">
                <div className="container-lg">
                    <AlertState />
                    {children}
                </div>
            </div>
        </BasePage>
    );
};

export default Page;
