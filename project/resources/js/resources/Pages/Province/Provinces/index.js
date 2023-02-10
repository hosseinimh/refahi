import React from "react";
import { useSelector } from "react-redux";

import { provincesPage as strings } from "../../../../constants/strings";
import * as funcs from "./funcs";
import { ListPage, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";

const Provinces = () => {
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
                            onClick={() => funcs.onCities(item)}
                            title={strings.cities}
                            disabled={ls?.loading}
                        >
                            {strings.cities}
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
            strings={strings}
            table={{ renderHeader, renderItems }}
            hasAdd={false}
            funcs={funcs}
        />
    );
};

export default Provinces;
