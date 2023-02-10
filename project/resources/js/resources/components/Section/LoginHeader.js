import React from "react";

import { basePath, iconsPath } from "../../../constants";

const LoginHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href={basePath}>
                    <img src={`${iconsPath}/logo.svg`} alt="logo" />
                </a>
            </div>
        </nav>
    );
};

export default LoginHeader;
