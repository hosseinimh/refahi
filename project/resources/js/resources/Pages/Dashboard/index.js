import React from "react";
import { useSelector } from "react-redux";

import * as funcs from "./funcs";
import { dashboardPage as strings } from "../../../constants/strings";
import utils from "../../../utils/Utils";
import { USER_ROLES } from "../../../constants";
import { BlankPage, Card } from "../../components";

const Dashboard = () => {
    const ls = useSelector((state) => state.layoutReducer);
    const lsUser = utils.getLSUser();

    const renderUserReview = () => {
        return <Card containerStyle="bg-success"></Card>;
    };

    const renderAdminReview = () => {
        return (
            <Card containerStyle="bg-info">
                <div>
                    <div className="fs-4 fw-semibold">{strings.users}</div>
                    <div className="my-2">
                        {utils.en2faDigits(ls?.pageProps?.usersCount)}
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <BlankPage page={"Dashboard"} funcs={funcs}>
            {lsUser?.role === USER_ROLES.ADMINISTRATOR
                ? renderAdminReview()
                : renderUserReview()}
        </BlankPage>
    );
};

export default Dashboard;
