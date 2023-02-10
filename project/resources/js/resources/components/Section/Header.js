import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillFileEarmarkLockFill } from "react-icons/bs";

import { imgPath, vendorsPath, basePath, USER_ROLES } from "../../../constants";
import { header as strings, general } from "../../../constants/strings";
import { fetchLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const us = useSelector((state) => state.userReducer);
    const ls = useSelector((state) => state.layoutReducer);
    const lsUser = utils.getLSUser();

    const userTitle = () => {
        let title =
            lsUser?.role === USER_ROLES.ADMINISTRATOR
                ? general.administrator
                : general.user;

        title += `: [ ${lsUser?.username} ]`;

        return title;
    };

    const onLogout = () => {
        dispatch(fetchLogoutAction());
    };

    const onEditUser = () => {
        navigate(`${basePath}/users/edit/${lsUser?.id}`);
    };

    const onChanePassword = () => {
        navigate(`${basePath}/users/change_password`);
    };

    useEffect(() => {
        if (!us.isAuthenticated) {
            navigate(`${basePath}/users/login`);
        }
    }, [us]);

    return (
        <header className="header header-sticky mb-4 d-print-none">
            <div className="container-fluid">
                <button
                    className="header-toggler px-md-0 me-md-3"
                    type="button"
                >
                    <svg className="icon icon-lg">
                        <use
                            xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-menu`}
                        ></use>
                    </svg>
                </button>
                {general.brand}
                <ul className="header-nav ms-auto"></ul>
                <ul className="header-nav ms-3">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link py-0"
                            data-coreui-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <div className="avatar avatar-md">
                                <img
                                    className="avatar-img"
                                    src={`${imgPath}/avatars/man.png`}
                                    alt={`${lsUser?.name} ${lsUser?.family}`}
                                />
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end pt-0">
                            <div className="dropdown-header bg-light py-2">
                                <div className="fw-semibold">
                                    <p>{userTitle()}</p>
                                    <p
                                        style={{ marginBottom: "0" }}
                                    >{`${lsUser?.name} ${lsUser?.family}`}</p>
                                </div>
                            </div>
                            <button
                                className="dropdown-item"
                                onClick={onEditUser}
                            >
                                <BsFillEyeFill
                                    style={{
                                        marginRight: "-0.1rem",
                                        marginLeft: "0.9rem",
                                    }}
                                />
                                {strings.editUser}
                            </button>
                            <button
                                className="dropdown-item"
                                onClick={onChanePassword}
                            >
                                <BsFillFileEarmarkLockFill
                                    style={{
                                        marginRight: "-0.1rem",
                                        marginLeft: "0.9rem",
                                    }}
                                />
                                {strings.changePassword}
                            </button>
                            <button
                                className="dropdown-item"
                                onClick={onLogout}
                            >
                                <svg className="icon me-2">
                                    <use
                                        xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-account-logout`}
                                    ></use>
                                </svg>{" "}
                                {strings.logout}
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="header-divider"></div>
            <div className="container-fluid">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb my-0 ms-2">
                        <li className="breadcrumb-item">
                            <Link to={`${basePath}`}>
                                <span>{strings.home}</span>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">
                            <span>{ls?.title}</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </header>
    );
};

export default Header;
