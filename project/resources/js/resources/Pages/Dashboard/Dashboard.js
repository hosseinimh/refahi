import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Page from "../_layout/Page";
import { Dashboard as Entity } from "../../../http/entities";
import { dashboardPage as strings } from "../../../constants/strings";
import utils from "../../../utils/Utils";
import { MESSAGE_TYPES, USER_ROLES } from "../../../constants";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import { setMessageAction } from "../../../state/message/messageActions";

const Dashboard = () => {
    const dispatch = useDispatch();
    let entity = new Entity();
    const lsUser = utils.getLSUser();
    const [items, setItems] = useState(null);
    const [isCurrent, setIsCurrent] = useState(true);

    const getReview = async () => {
        dispatch(setLoadingAction(true));

        let result =
            lsUser?.role === USER_ROLES.ADMINISTRATOR
                ? await entity.getAdminReview()
                : await entity.getUserReview();

        dispatch(setLoadingAction(false));

        if (result === null) {
            dispatch(
                setMessageAction(
                    entity.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    entity.errorCode
                )
            );
            setItems(null);

            return;
        }

        setItems(result.items);
    };

    useEffect(() => {
        dispatch(setTitleAction(strings._title));

        getReview();

        return () => {
            setIsCurrent(false);
        };
    }, []);

    const renderUserReview = () => {
        return (
            <div className="row">
                <div className="col-sm-4 col-lg-3">
                    <div className="card mb-4 text-white bg-success card-dashboard">
                        <div className="card-body pb-2 d-flex justify-content-between align-items-start">
                            <div>
                                <div className="fs-4 fw-semibold">
                                    {strings.unseenTickets}
                                </div>
                                <div className="my-2">
                                    {utils.en2faDigits(items?.tickets)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderAdminReview = () => {
        return (
            <div className="row">
                <div className="col-sm-4 col-lg-3">
                    <div className="card mb-4 text-white bg-info card-dashboard">
                        <div className="card-body pb-2 d-flex justify-content-between align-items-start">
                            <div>
                                <div className="fs-4 fw-semibold">
                                    {strings.users}
                                </div>
                                <div className="my-2">
                                    {utils.en2faDigits(items?.users)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!isCurrent) <></>;

    return (
        <Page page={"Dashboard"}>
            {lsUser?.role === USER_ROLES.ADMINISTRATOR
                ? renderAdminReview()
                : renderUserReview()}
        </Page>
    );
};

export default Dashboard;
