import React from "react";
import { useSelector } from "react-redux";

import { usersPage as strings, general } from "../../../../constants/strings";
import * as funcs from "./funcs";
import { List, TableFooter, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";
import { USER_ROLES } from "../../../../constants";

const Users = () => {
    const _columnsCount = 5;
    const _ls = useSelector((state) => state.layoutReducer);

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.username}
            </th>
            <th scope="col">{strings.nameFamily}</th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.city}
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.role}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = _ls?.pageProps?.items?.map((item, index) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td scope="row">
                        {utils.en2faDigits(
                            (_ls?.pageProps?.pageNumber - 1) * 10 + index + 1
                        )}
                    </td>
                    <td>{item.username}</td>
                    <td>{`${item.name} ${item.family}`}</td>
                    <td>
                        {item.cityId === 0
                            ? `-----`
                            : `${item.provinceName} / ${item.cityName}`}
                    </td>
                    <td>
                        {item.role === USER_ROLES.ADMINISTRATOR
                            ? general.administrator
                            : general.user}
                    </td>
                </tr>
                <tr>
                    <td colSpan={_columnsCount}>
                        <button
                            type="button"
                            className="btn btn-warning mb-2 px-4 ml-2"
                            onClick={() => funcs.onEdit(item)}
                            title={general.edit}
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
            page={"Users"}
            renderHeader={renderHeader}
            renderItems={renderItems}
            renderFooter={() => (
                <TableFooter columnsCount={_columnsCount} funcs={funcs} />
            )}
            strings={strings}
            funcs={funcs}
        />
    );
};

export default Users;
