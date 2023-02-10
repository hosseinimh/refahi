import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { general } from "../../../constants/strings";
import { setPagePropsAction } from "../../../state/layout/layoutActions";
import { clearMessageAction } from "../../../state/message/messageActions";
import { InsertPage } from "../../Pages/_layout";

const FormPage = ({
    children,
    page,
    strings,
    funcs,
    useForm,
    modals = null,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ls = useSelector((state) => state.layoutReducer);
    const [params, setParams] = useState({});
    const newParams = useParams();

    funcs.init(dispatch, navigate, useForm.setValue);

    if (JSON.stringify(params) !== JSON.stringify(newParams)) {
        setParams(newParams);
    }

    useEffect(() => {
        funcs.onLayoutState();
    }, [ls]);

    useEffect(() => {
        funcs.onLoad(params);
    }, [params]);

    useEffect(() => {
        loadModals();
    }, []);

    const loadModals = () => {
        let modalObjs = [];

        modals?.map((modal) => {
            const modalElement = document.getElementById(modal.id);
            const m = new coreui.Modal(modalElement);
            const form = modal?.useForm;

            modalElement.addEventListener("hidden.coreui.modal", () => {
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
        <InsertPage page={page} strings={strings} useForm={useForm}>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">{children}</div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-12">
                                    <button
                                        className="btn btn-success px-4 ml-2"
                                        type="button"
                                        onClick={useForm.handleSubmit(
                                            funcs.onSubmit
                                        )}
                                        disabled={ls?.loading}
                                    >
                                        {general.submit}
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={funcs.onCancel}
                                        disabled={ls?.loading}
                                    >
                                        {general.cancel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InsertPage>
    );
};

export default FormPage;
