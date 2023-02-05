import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import * as Pages from "../Pages";
import { Header, Sidebar } from "../components";
import { footer as strings } from "../../constants/strings";
import utils from "../../utils/Utils";
import { basePath, USER_ROLES } from "../../constants";

function AuthRoute() {
    const state = useSelector((state) => state.userReducer);
    const layoutState = useSelector((state) => state.layoutReducer);
    const [auth, setAuth] = useState(state.isAuthenticated);
    const lsUser = utils.getLSUser();

    useEffect(() => {
        validateAuth();
    }, [state]);

    const validateAuth = () => {
        try {
            if (!state.isAuthenticated || !lsUser || !lsUser?.id) {
                utils.clearLS();
                setAuth(false);
            } else {
                setAuth(true);
            }
        } catch (error) {
            utils.clearLS();
            setAuth(false);
        }
    };

    return (
        <Router>
            {auth && <Sidebar />}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {auth && (
                    <>
                        <Header />
                        <Routes>
                            {lsUser?.role === USER_ROLES.ADMINISTRATOR && (
                                <>
                                    <Route
                                        path={`${basePath}/users/login`}
                                        element={<Navigate to={basePath} />}
                                    />
                                    <Route
                                        path={`${basePath}/users/change_password/:userId`}
                                        element={<Pages.ChangePasswordUser />}
                                    />
                                    <Route
                                        path={`${basePath}/users/add`}
                                        element={<Pages.AddUser />}
                                    />
                                    <Route
                                        path={`${basePath}/users`}
                                        element={<Pages.Users />}
                                    />
                                    <Route
                                        path={`${basePath}/provinces`}
                                        element={<Pages.Provinces />}
                                    />
                                    <Route
                                        path={`${basePath}/cities/:provinceId`}
                                        element={<Pages.Cities />}
                                    />
                                    <Route
                                        path={`${basePath}/mci_centers/add/:cityId`}
                                        element={<Pages.AddMciCenter />}
                                    />
                                    <Route
                                        path={`${basePath}/mci_centers/edit/:mciCenterId`}
                                        element={<Pages.EditMciCenter />}
                                    />
                                    <Route
                                        path={`${basePath}/mci_centers/:cityId`}
                                        element={<Pages.MciCenters />}
                                    />
                                    <Route
                                        path={`${basePath}/equipment_types/add`}
                                        element={<Pages.AddEquipmentType />}
                                    />
                                    <Route
                                        path={`${basePath}/equipment_types/edit/:equipmentTypeId`}
                                        element={<Pages.EditEquipmentType />}
                                    />
                                    <Route
                                        path={`${basePath}/equipment_types`}
                                        element={<Pages.EquipmentTypes />}
                                    />
                                    <Route
                                        path={`${basePath}/equipments/add`}
                                        element={<Pages.AddEquipment />}
                                    />
                                    <Route
                                        path={`${basePath}/equipments/edit/:equipmentId`}
                                        element={<Pages.EditEquipment />}
                                    />
                                    <Route
                                        path={`${basePath}/equipments`}
                                        element={<Pages.Equipments />}
                                    />
                                </>
                            )}

                            {lsUser?.role === USER_ROLES.USER && <></>}

                            <Route
                                path={basePath}
                                element={<Pages.Dashboard />}
                            />
                            <Route
                                path={`${basePath}/users/view`}
                                element={<Pages.ViewUser />}
                            />
                            <Route
                                path={`${basePath}/users/change_password`}
                                element={<Pages.ChangePasswordUser />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to={basePath} />}
                            />
                        </Routes>
                    </>
                )}
                {!auth && (
                    <Routes>
                        <Route
                            path={`${basePath}/users/login`}
                            exact={true}
                            element={<Pages.LoginUser />}
                        />
                        <Route
                            path="*"
                            element={
                                <Navigate to={`${basePath}/users/login`} />
                            }
                        />
                    </Routes>
                )}
                <footer className="footer d-print-none">
                    <div className="container-fluid sub-footer">
                        <p>{strings.text14}</p>
                        <p className="developer">
                            <a
                                href="http://www.hosseinimh.com"
                                target={"_blank"}
                                className="link"
                            >
                                {strings.text15}
                            </a>
                        </p>
                    </div>
                </footer>
                <div
                    className="loading-wrapper"
                    style={{
                        display: layoutState?.loading ? "flex" : "none",
                    }}
                >
                    <div className="loading"></div>
                    <p>{strings.loading}</p>
                </div>
            </div>
        </Router>
    );
}

export default AuthRoute;
