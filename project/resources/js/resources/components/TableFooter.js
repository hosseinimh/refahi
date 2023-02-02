import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../constants/strings";
import utils from "../../utils/Utils";

const TableFooter = ({ columnsCount, funcs }) => {
    const _ls = useSelector((state) => state.layoutReducer);

    if (_ls?.loading) {
        return;
    }

    let pagesCount = Math.ceil(_ls?.pageProps?.itemsCount / 10);
    let prevStatus = _ls?.pageProps?.pageNumber === 1 ? "disabled" : "";
    let nextStatus = _ls?.pageProps?.pageNumber >= pagesCount ? "disabled" : "";
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
            <th scope="row" colSpan={columnsCount}>
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

export default TableFooter;
