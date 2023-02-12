import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { general } from "../../../constants/strings";
import { PageLayout } from "../";
import Table from "../Table/Table";

const ListPage = ({
    page,
    strings,
    funcs,
    useForm,
    children,
    table,
    hasAdd = true,
    backUrl = null,
}) => {
    const navigate = useNavigate();
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <PageLayout
            page={page}
            strings={strings}
            funcs={funcs}
            useForm={useForm}
        >
            {children}
            {(hasAdd || backUrl) && (
                <div className="row mb-2">
                    <div className="col-sm-12 mb-4">
                        {hasAdd && (
                            <button
                                className="btn btn-success px-4"
                                type="button"
                                title={strings.add}
                                onClick={funcs.onAdd}
                                disabled={ls?.loading}
                            >
                                {strings.add}
                            </button>
                        )}
                        {backUrl && (
                            <button
                                className="btn btn-secondary mr-2 px-4"
                                type="button"
                                title={general.back}
                                onClick={() => navigate(backUrl)}
                                disabled={ls?.loading}
                            >
                                {general.back}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="row mb-4">
                <Table
                    renderHeader={table.renderHeader}
                    renderItems={table.renderItems}
                    renderFooter={table?.renderFooter}
                />
            </div>
        </PageLayout>
    );
};

export default ListPage;
