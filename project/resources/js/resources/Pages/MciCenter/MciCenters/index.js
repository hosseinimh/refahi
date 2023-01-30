import React from "react";
import { useSelector } from "react-redux";

import {
    mciCentersPage as strings,
    general,
} from "../../../../constants/strings";
import * as funcs from "./funcs";
import { List, TableItems } from "../../../components";
import { basePath } from "../../../../constants";
import utils from "../../../../utils/Utils";

const MciCenters = () => {
    const _columnsCount = 2;
    const _ls = useSelector((state) => state.layoutReducer);

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col">{strings.name}</th>
        </tr>
    );

    const renderItems = () => {
        const children = _ls?.pageProps?.items?.map((item, index) => (
            <React.Fragment key={item.id}>
                <tr key={item.id}>
                    <td scope="row">{utils.en2faDigits(index + 1)}</td>
                    <td>{item.name}</td>
                </tr>
                <tr>
                    <td colSpan={_columnsCount}>
                        <button
                            type="button"
                            className="btn btn-warning mb-2 px-4 ml-2"
                            title={strings.mciCenters}
                            disabled={_ls?.loading}
                        >
                            {strings.mciCenters}
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={_columnsCount} children={children} />;
    };

    const renderFooter = () => {
        if (_ls?.loading) {
            return;
        }
        console.log(_ls?.pageProps);
        let pagesCount = Math.ceil(_ls?.pageProps?.itemsCount / 10);
        let prevStatus = _ls?.pageProps?.pageNumber === 1 ? "disabled" : "";
        let nextStatus =
            _ls?.pageProps?.pageNumber >= pagesCount ? "disabled" : "";
        let pages = [_ls?.pageProps?.pageNumber];

        for (
            let i = _ls?.pageProps?.pageNumber - 1;
            i >= 1 && i >= _ls?.pageProps?.pageNumber - 2;
            i--
        ) {
            pages.push(i);
        }

        for (
            let i = _ls?.pageProps?.pageNumber + 1;
            i <= pagesCount && i <= _ls?.pageProps?.pageNumber + 2;
            i++
        ) {
            pages.push(i);
        }

        pages.sort();

        return (
            <tr>
                <th scope="row" colSpan={_columnsCount}>
                    <nav className="pagination" aria-label="...">
                        <ul className="pagination">
                            <li className={`page-item ${prevStatus}`}>
                                <a
                                    className="page-link"
                                    tabIndex={"-1"}
                                    aria-disabled="true"
                                    onClick={() => funcs.setPage(1)}
                                >
                                    {general.first}
                                </a>
                            </li>
                            <li className={`page-item ${prevStatus}`}>
                                <a
                                    className="page-link"
                                    aria-disabled="true"
                                    onClick={() =>
                                        funcs.setPage(
                                            _ls?.pageProps?.pageNumber - 1
                                        )
                                    }
                                >
                                    {general.previous}
                                </a>
                            </li>
                            {pages.map((page, index) => (
                                <li
                                    className={`page-item ${
                                        page === _ls?.pageProps?.pageNumber
                                            ? "active"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <a
                                        className="page-link"
                                        onClick={() => funcs.setPage(page)}
                                    >
                                        {utils.en2faDigits(page)}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${nextStatus}`}>
                                <a
                                    className="page-link"
                                    onClick={() =>
                                        funcs.setPage(
                                            _ls?.pageProps?.pageNumber + 1
                                        )
                                    }
                                >
                                    {general.next}
                                </a>
                            </li>
                            <li className={`page-item ${nextStatus}`}>
                                <a
                                    className="page-link"
                                    onClick={() => funcs.setPage(pagesCount)}
                                >
                                    {general.last}
                                </a>
                            </li>
                        </ul>
                        <span className="mx-4">
                            {utils.en2faDigits(_ls?.pageProps?.itemsCount)}{" "}
                            {general.records}
                        </span>
                    </nav>
                </th>
            </tr>
        );
    };

    return (
        <List
            page={"Provinces"}
            renderHeader={renderHeader}
            renderItems={renderItems}
            renderFooter={renderFooter}
            hasAdd={false}
            strings={strings}
            funcs={funcs}
            backUrl={`${basePath}/cities/${_ls?.pageProps?.city?.provinceId}`}
        />
    );
};

export default MciCenters;
