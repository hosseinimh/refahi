import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { InsertPage } from "../_layout";
import { User as Entity } from "../../../http/entities";
import { viewUserPage as strings, general } from "../../../constants/strings";
import utils from "../../../utils/Utils";
import {
    basePath,
    MESSAGE_TYPES,
    MESSAGE_CODES,
    USER_ROLES,
} from "../../../constants";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import { setMessageAction } from "../../../state/message/messageActions";

const ViewUser = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const navigate = useNavigate();
    let entity = new Entity();
    let { userId } = useParams();
    userId = parseInt(userId);
    const lsUser = utils.getLSUser();
    const callbackUrl =
        lsUser?.role === USER_ROLES.ADMINISTRATOR
            ? `${basePath}/users`
            : basePath;
    const [isCurrent, setIsCurrent] = useState(true);
    const { register, setValue } = useForm();

    const fillForm = async () => {
        dispatch(setLoadingAction(true));

        let result =
            lsUser?.role === USER_ROLES.ADMINISTRATOR
                ? await entity.getAdmin(userId)
                : await entity.getUser();

        if (result === null) {
            dispatch(
                setMessageAction(
                    general.itemNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND,
                    false
                )
            );
            navigate(callbackUrl);

            return;
        }

        setValue("name", result.item.name);
        setValue("family", result.item.family);
        dispatch(
            setTitleAction(
                `${strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.username} ]`
            )
        );

        dispatch(setLoadingAction(false));
    };

    const onCancel = () => {
        navigate(callbackUrl);
    };

    useEffect(() => {
        dispatch(setTitleAction(strings._title));

        if (isNaN(userId) || userId <= 0) {
            userId = lsUser?.id;
        }

        fillForm();

        return () => {
            setIsCurrent(false);
        };
    }, []);

    const renderInputRow = (field, type = "text") => {
        return (
            <div className="col-12 pb-4">
                <label className="form-label" htmlFor={field}>
                    {strings[field]}
                </label>
                <input
                    {...register(`${field}`)}
                    className="form-control"
                    id={field}
                    disabled={true}
                    type={type}
                />
            </div>
        );
    };

    const renderForm = () => (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    {renderInputRow("name")}
                    {renderInputRow("family")}
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="btn btn-secondary px-4"
                            type="button"
                            onClick={onCancel}
                            disabled={layoutState?.loading}
                        >
                            {general.back}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!isCurrent) <></>;

    return (
        <InsertPage page={"ViewUser"}>
            <div className="row">
                <div className="col-12">{renderForm()}</div>
            </div>
        </InsertPage>
    );
};

export default ViewUser;
