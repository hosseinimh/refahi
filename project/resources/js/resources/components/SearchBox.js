import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../constants/strings";

const SearchBox = ({ children }) => {
    const _ls = useSelector((state) => state.layoutReducer);

    return (
        <div className="card mb-4">
            <div className="card-header bg-info">
                <div className="row">
                    <div className="col-12">
                        <span className="text-white">{general.search}</span>
                    </div>
                </div>
            </div>
            <div className="card-body">{children}</div>
            <div className="card-footer bg-light">
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="btn btn-dark px-4"
                            type="button"
                            disabled={_ls?.loading}
                            title={general.search}
                        >
                            {general.search}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
