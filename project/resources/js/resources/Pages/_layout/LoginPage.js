import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AlertState } from "../../components";
import { general } from "../../../constants/strings";
import BasePage from "./BasePage";
import { setPagePropsAction } from "../../../state/layout/layoutActions";

const LoginPage = ({ children, strings, useForm, funcs }) => {
    const dispatch = useDispatch();
    const ls = useSelector((state) => state.layoutReducer);

    useEffect(() => {
        dispatch(setPagePropsAction({ strings, useForm }));
    }, []);

    return (
        <BasePage
            authPage={false}
            funcs={funcs}
            errors={useForm.formState.errors}
        >
            <div className="bg-light d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
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
                                                    onClick={useForm.handleSubmit(
                                                        funcs.onSubmit
                                                    )}
                                                    className="btn btn-success px-4"
                                                    type="button"
                                                    disabled={ls?.loading}
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
        </BasePage>
    );
};

export default LoginPage;
