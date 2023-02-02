import React, { useEffect, useState } from "react";
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
import {
    AlertMessage,
    AlertState,
    LoginFooter,
    LoginHeader,
} from "../../components";
import utils from "../../../utils/Utils";
import { general } from "../../../constants/strings";

const LoginPage = ({
    children,
    page,
    strings,
    errors = null,
    handleSubmit,
    funcs,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _ls = useSelector((state) => state.layoutReducer);
    const _ms = useSelector((state) => state.messageReducer);
    const _us = useSelector((state) => state.userReducer);
    const [globalMessage, setGlobalMessage] = useState(null);
    const [message, setMessage] = useState(null);

    funcs.init(dispatch, navigate);

    useEffect(() => {
        funcs.onLayoutState();
    }, [_ls]);

    useEffect(() => {
        if (_ms?.messageType === MESSAGE_TYPES.SUCCESS) {
            setMessage(_ms);
        }
    }, [_ms]);

    useEffect(() => {
        if (_us?.error) {
            dispatch(setLoadingAction(false));
            dispatch(
                setMessageAction(
                    _us?.error,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.FORM_INPUT_INVALID
                )
            );
        }
    }, [_us]);

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

        if (utils.getLSUser()) {
            dispatch(clearLogoutAction());
            navigate(`${basePath}/users/login`);

            return;
        }

        dispatch(setPageAction(page));
        dispatch(setRenderMessageAction());
        dispatch(setLoadingAction(false));

        if (_ms?.messageField || _ms?.messageRender) {
            dispatch(clearMessageAction());
        }

        let gMessage = localStorage.getItem("globalMessage");

        if (gMessage) {
            try {
                setGlobalMessage(JSON.parse(gMessage));
            } catch {}
            localStorage.removeItem("globalMessage");
        }
    }, []);

    return (
        <>
            <LoginHeader />
            <div className="bg-light d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        {globalMessage && (
                            <div className="col-lg-8">
                                <AlertMessage
                                    message={globalMessage?.message}
                                    messageType={
                                        globalMessage?.type === 0
                                            ? MESSAGE_TYPES.ERROR
                                            : MESSAGE_TYPES.SUCCESS
                                    }
                                />
                            </div>
                        )}
                        {message && (
                            <div className="col-lg-8">
                                <AlertMessage
                                    message={message?.message}
                                    messageType={message?.messageType}
                                />
                            </div>
                        )}
                        <div className="col-lg-8">
                            <div className="card-group d-block d-md-flex row">
                                <div className="card col-md-7 p-4 mb-0">
                                    <div className="card-body">
                                        <h1>{strings._title}</h1>
                                        <p className="text-medium-emphasis">
                                            {strings.description}
                                        </p>
                                        <AlertState />
                                        {children}
                                        <div className="row">
                                            <div className="col-6">
                                                <button
                                                    onClick={handleSubmit(
                                                        funcs.onSubmit
                                                    )}
                                                    className="btn btn-success px-4"
                                                    type="button"
                                                    disabled={_ls?.loading}
                                                >
                                                    {general.submit}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoginFooter />
        </>
    );
};

export default LoginPage;
