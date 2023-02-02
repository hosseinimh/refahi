import React from "react";
import { useSelector } from "react-redux";

import {
    mciCentersPage as strings,
    general,
} from "../../../../constants/strings";
import * as funcs from "./funcs";
import { List, TableFooter, TableItems } from "../../../components";
import { basePath } from "../../../../constants";
import utils from "../../../../utils/Utils";

const MciCenters = () => {
    const _columnsCount = 3;
    const _ls = useSelector((state) => state.layoutReducer);

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col" style={{ width: "200px" }}>
                {strings.name}
            </th>
            <th scope="col">{`${strings.tel} / ${strings.address}`}</th>
        </tr>
    );

    const renderItems = () => {
        const children = _ls?.pageProps?.items?.map((item, index) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td scope="row">{utils.en2faDigits(index + 1)}</td>
                    <td>{item.name}</td>
                    <td>
                        <p>{item.tel}</p>
                        <p>{item.address}</p>
                    </td>
                </tr>
                <tr>
                    <td colSpan={_columnsCount}>
                        <button
                            type="button"
                            className="btn btn-warning mb-2 px-4 ml-2"
                            title={general.edit}
                            onClick={() => funcs.onEdit(item)}
                            disabled={_ls?.loading}
                        >
                            {general.edit}
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={_columnsCount} children={children} />;
    };

    return (
        <List
            page={"Provinces"}
            renderHeader={renderHeader}
            renderItems={renderItems}
            renderFooter={() => (
                <TableFooter columnsCount={_columnsCount} funcs={funcs} />
            )}
            strings={strings}
            funcs={funcs}
            backUrl={`${basePath}/cities/${_ls?.pageProps?.city?.provinceId}`}
        />
    );
};

export default MciCenters;
