import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import * as Pages from "../Pages";
import utils from "../../utils/Utils";
import { basePath, USER_ROLES } from "../../constants";

function AuthRoute() {
    const us = useSelector((state) => state.userReducer);
    const lsUser = utils.getLSUser();

    return (
        <Router>
            {us.isAuthenticated && (
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
                            />{" "}
                            <Route
                                path={`${basePath}/users/edit/:userId`}
                                element={<Pages.EditUser />}
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
                            <Route
                                path={`${basePath}/place_types/add`}
                                element={<Pages.AddPlaceType />}
                            />
                            <Route
                                path={`${basePath}/place_types/edit/:placeTypeId`}
                                element={<Pages.EditPlaceType />}
                            />
                            <Route
                                path={`${basePath}/place_types`}
                                element={<Pages.PlaceTypes />}
                            />
                        </>
                    )}

                    {lsUser?.role === USER_ROLES.USER && <></>}

                    <Route path={basePath} element={<Pages.Dashboard />} />
                    <Route
                        path={`${basePath}/users/change_password`}
                        element={<Pages.ChangePasswordUser />}
                    />
                    <Route path="*" element={<Navigate to={basePath} />} />
                </Routes>
            )}
            {!us.isAuthenticated && (
                <Routes>
                    <Route
                        path={`${basePath}/users/login`}
                        exact={true}
                        element={<Pages.LoginUser />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to={`${basePath}/users/login`} />}
                    />
                </Routes>
            )}
        </Router>
    );
}

export default AuthRoute;
