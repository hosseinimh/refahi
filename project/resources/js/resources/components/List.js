import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { general } from "../../constants/strings";

import { Page } from "../Pages/_layout";
import Table from "./Table";

const List = ({
    page,
    funcs,
    strings,
    renderHeader,
    renderItems,
    renderFooter = null,
    hasAdd = true,
    backUrl = null,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _ls = useSelector((state) => state.layoutReducer);
    const [params, setParams] = useState({});
    const newParams = useParams();

    funcs.init(dispatch, navigate);

    if (JSON.stringify(params) !== JSON.stringify(newParams)) {
        setParams(newParams);
    }

    useEffect(() => {
        funcs.onLayoutState();
    }, [_ls]);

    useEffect(() => {
        funcs.onLoad(params);
    }, [params]);

    return (
        <Page page={page}>
            {(hasAdd || backUrl) && (
                <div className="row mb-2">
                    <div className="col-sm-12 mb-4">
                        {hasAdd && (
                            <button
                                className="btn btn-success px-4"
                                type="button"
                                title={strings.add}
                                onClick={funcs.onAdd}
                                disabled={_ls?.loading}
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
                                disabled={_ls?.loading}
                            >
                                {general.back}
                            </button>
                        )}
                    </div>
                </div>
            )}
            <div className="row mb-4">
                <Table
                    renderHeader={renderHeader}
                    renderItems={renderItems}
                    renderFooter={renderFooter}
                />
            </div>
        </Page>
    );
};

export default List;
