import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { Page } from "../../Pages/_layout";

const BlankPage = ({ page, strings, funcs, useForm, children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ls = useSelector((state) => state.layoutReducer);
    const [params, setParams] = useState({});
    const newParams = useParams();

    funcs.init(dispatch, navigate);

    if (JSON.stringify(params) !== JSON.stringify(newParams)) {
        setParams(newParams);
    }

    useEffect(() => {
        funcs.onLayoutState();
    }, [ls]);

    useEffect(() => {
        funcs.onLoad(params);
    }, [params]);

    return (
        <Page page={page} strings={strings} useForm={useForm}>
            {children}
        </Page>
    );
};

export default BlankPage;
