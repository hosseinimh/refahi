import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import {
    setPageAction,
    setLoadingAction,
    setPagePropsAction,
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

const BasePageLayout = ({
    page,
    strings,
    funcs,
    useForm,
    children,
    authPage = true,
    modals,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);
    const us = useSelector((state) => state.userReducer);
    const [params, setParams] = useState({});
    const newParams = useParams();

    if (JSON.stringify(params) !== JSON.stringify(newParams)) {
        setParams(newParams);
    }

    useEffect(() => {
        funcs?.onLoad(params);
    }, [params]);

    funcs?.init(dispatch, navigate, useForm);

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
        if (
            typeof useForm?.formState?.errors === "object" &&
            useForm.formState.errors
        ) {
            const hasKeys = !!Object.keys(useForm.formState.errors).length;

            if (hasKeys) {
                dispatch(
                    setMessageAction(
                        useForm.formState.errors[
                            Object.keys(useForm.formState.errors)[0]
                        ].message,
                        MESSAGE_TYPES.ERROR,
                        MESSAGE_CODES.FORM_INPUT_INVALID,
                        true,
                        Object.keys(useForm.formState.errors)[0]
                    )
                );
            }
        }
    }, [useForm?.formState?.errors]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const user = utils.getLSUser();

        if ((authPage && !user) || (!authPage && user)) {
            dispatch(clearLogoutAction());
            navigate(`${basePath}/users/login`);

            return;
        }

        dispatch(setPageAction(page));
        dispatch(setPagePropsAction({ strings, useForm }));
        dispatch(setRenderMessageAction());

        if (ms?.messageField || ms?.messageRender) {
            dispatch(clearMessageAction());
        }

        loadModals();
    }, []);

    const loadModals = () => {
        let modalObjs = [];

        modals?.map((modal) => {
            const modalElement = document.getElementById(modal.id);
            const m = modalElement ? new coreui.Modal(modalElement) : null;
            const form = modal?.useForm;

            modalElement?.addEventListener("hidden.coreui.modal", () => {
                dispatch(
                    setPagePropsAction({
                        item: null,
                        action: null,
                    })
                );
                dispatch(clearMessageAction());
                form?.reset();
            });

            modalObjs = [{ modal: m, form }, ...modalObjs];
        });

        if (funcs?.loadModals instanceof Function) {
            funcs.loadModals(modalObjs);
        }
    };

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

export default BasePageLayout;
