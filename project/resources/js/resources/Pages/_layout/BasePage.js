import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import {
    setPageAction,
    setLoadingAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
    setRenderMessageAction,
} from "../../../state/message/messageActions";
import { clearLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import {
    Footer,
    Header,
    LoginFooter,
    LoginHeader,
    Sidebar,
} from "../../components";

const BasePage = ({ page, errors, funcs, children, authPage = true }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);
    const us = useSelector((state) => state.userReducer);

    funcs?.init(dispatch, navigate);

    useEffect(() => {
        funcs?.onLayoutState();
    }, [ls]);

    useEffect(() => {
        if (us?.error) {
            dispatch(setLoadingAction(false));
            dispatch(
                setMessageAction(
                    us?.error,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.FORM_INPUT_INVALID
                )
            );
        }
    }, [us]);

    useEffect(() => {
        if (typeof errors === "object" && errors) {
            const hasKeys = !!Object.keys(errors).length;

            if (hasKeys) {
                dispatch(
                    setMessageAction(
                        errors[Object.keys(errors)[0]].message,
                        MESSAGE_TYPES.ERROR,
                        MESSAGE_CODES.FORM_INPUT_INVALID,
                        true,
                        Object.keys(errors)[0]
                    )
                );
            }
        }
    }, [errors]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const user = utils.getLSUser();

        if ((authPage && !user) || (!authPage && user)) {
            dispatch(clearLogoutAction());
            navigate(`${basePath}/users/login`);

            return;
        }

        dispatch(setPageAction(page));
        dispatch(setRenderMessageAction());
        dispatch(setLoadingAction(false));

        if (ms?.messageField || ms?.messageRender) {
            dispatch(clearMessageAction());
        }
    }, []);

    return (
        <>
            {us.isAuthenticated && <Sidebar />}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {us.isAuthenticated && <Header />}
                {!us.isAuthenticated && <LoginHeader />}
                {children}
                {us.isAuthenticated && <Footer />}
                {!us.isAuthenticated && <LoginFooter />}
            </div>
        </>
    );
};

export default BasePage;
