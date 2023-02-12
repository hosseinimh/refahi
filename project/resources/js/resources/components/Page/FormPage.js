import react from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings";
import { FormPageLayout } from "../";

const FormPage = ({
    children,
    page,
    strings,
    funcs,
    useForm,
    modals = null,
}) => {
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <FormPageLayout
            page={page}
            strings={strings}
            funcs={funcs}
            useForm={useForm}
            modals={modals}
        >
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
        </FormPageLayout>
    );
};

export default FormPage;
