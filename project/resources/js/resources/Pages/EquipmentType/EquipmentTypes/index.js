import React from "react";
import { useSelector } from "react-redux";

import {
    equipmentTypesPage as strings,
    general,
} from "../../../../constants/strings";
import * as funcs from "./funcs";
import { ListPage, TableFooter, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";

const EquipmentTypes = () => {
    const ls = useSelector((state) => state.layoutReducer);
    const columnsCount = 3;

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col">{strings.name}</th>
            <th scope="col" style={{ width: "200px" }}>
                {strings.type}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = ls?.pageProps?.items?.map((item, index) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td scope="row">{utils.en2faDigits(index + 1)}</td>
                    <td>{item.name}</td>
                    <td>{item.typeText}</td>
                </tr>
                <tr>
                    <td colSpan={columnsCount}>
                        <button
                            type="button"
                            className="btn btn-warning mb-2 px-4 ml-2"
                            title={general.edit}
                            onClick={() => funcs.onEdit(item)}
                            disabled={ls?.loading}
                        >
                            {general.edit}
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={columnsCount} children={children} />;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} funcs={funcs} />
    );

    return (
        <ListPage
            page={"EquipmentTypes"}
            table={{ renderHeader, renderItems, renderFooter }}
            strings={strings}
            funcs={funcs}
        />
    );
};

export default EquipmentTypes;
