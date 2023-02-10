import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { usersPage as strings, general } from "../../../../constants/strings";
import * as funcs from "./funcs";
import {
    InputSelectColumn,
    InputTextColumn,
    List,
    SearchBox,
    TableFooter,
    TableItems,
} from "../../../components";
import utils from "../../../../utils/Utils";
import { USER_ROLES } from "../../../../constants";
import { searchUserSchema as schema } from "../../../validations";

const Users = () => {
    const ls = useSelector((state) => state.layoutReducer);
    const columnsCount = 5;
    const form = useForm({
        resolver: yupResolver(schema),
    });

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
                {strings.provinceCity}
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.role}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = ls?.pageProps?.items?.map((item, index) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td scope="row">
                        {utils.en2faDigits(
                            (ls?.pageProps?.pageNumber - 1) * 10 + index + 1
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
                    <td colSpan={columnsCount}>
                        <button
                            type="button"
                            className="btn btn-warning mb-2 px-4 ml-2"
                            onClick={() => funcs.onEdit(item)}
                            title={general.edit}
                            disabled={ls?.loading}
                        >
                            {general.edit}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary mb-2 px-4 ml-2"
                            onClick={() => funcs.onChangePassword(item)}
                            title={strings.changePassword}
                            disabled={ls?.loading}
                        >
                            {strings.changePassword}
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
        <List
            page={"Users"}
            useForm={form}
            table={{ renderHeader, renderItems, renderFooter }}
            strings={strings}
            funcs={funcs}
        >
            <SearchBox useForm={form}>
                <div className="row">
                    <InputTextColumn
                        field="username"
                        useForm={form}
                        strings={strings}
                        inputStyle={{
                            textAlign: "left",
                        }}
                    />
                    <InputSelectColumn
                        field="province"
                        strings={strings}
                        useForm={form}
                        items={ls?.pageProps?.provinces}
                        valueItem={"name"}
                        selectedValues={"11"}
                        noSelect={true}
                    />
                </div>
            </SearchBox>
        </List>
    );
};

export default Users;
