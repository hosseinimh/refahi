import React from "react";
import { useSelector } from "react-redux";

import { citiesPage as strings } from "../../../../constants/strings";
import * as funcs from "./funcs";
import { ListPage, TableItems } from "../../../components";
import { basePath } from "../../../../constants";
import utils from "../../../../utils/Utils";

const Cities = () => {
    const ls = useSelector((state) => state.layoutReducer);
    const columnsCount = 2;

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col">{strings.name}</th>
        </tr>
    );

    const renderItems = () => {
        const children = ls?.pageProps?.items?.map((item, index) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td scope="row">{utils.en2faDigits(index + 1)}</td>
                    <td>{item.name}</td>
                </tr>
                <tr>
                    <td colSpan={columnsCount}>
                        <button
                            type="button"
                            className="btn btn-warning mb-2 px-4 ml-2"
                            title={strings.mciCenters}
                            onClick={() => funcs.onMciCenters(item)}
                            disabled={ls?.loading}
                        >
                            {strings.mciCenters}
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={columnsCount} children={children} />;
    };

    return (
        <ListPage
            page={"Provinces"}
            table={{ renderHeader, renderItems }}
            hasAdd={false}
            strings={strings}
            funcs={funcs}
            backUrl={`${basePath}/provinces`}
        />
    );
};

export default Cities;
