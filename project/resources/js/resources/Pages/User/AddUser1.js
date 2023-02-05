import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InsertPage } from "../_layout";
import { Unit, User as Entity } from "../../../http/entities";
import { addUserPage as strings, general } from "../../../constants/strings";
import { addUserSchema as schema } from "../../validations";
import { MESSAGE_TYPES, MESSAGE_CODES, basePath } from "../../../constants";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageActions";

const AddUser = () => {
    /*const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const navigate = useNavigate();
    let entity = new Entity();
    let { unitId } = useParams();
    unitId = parseInt(unitId);
    const [unit, setUnit] = useState({});
    let callbackUrl = `${basePath}/users`;
    const [isCurrent, setIsCurrent] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const fetchUnit = async () => {
        if (isNaN(unitId)) {
            setUnit(null);

            return;
        }

        const unitEntity = new Unit();
        let result = await unitEntity.get(unitId);

        if (result === null) {
            setUnit(null);
        } else {
            setUnit(result.item);

            callbackUrl = `${basePath}/users/${unitId}`;
        }
    };

    useEffect(() => {
        if (unit?.id) {
            dispatch(setTitleAction(`${strings._title} [ ${unit?.title}]`));
        } else if (unit === null) {
            dispatch(setTitleAction(strings._title));
        }
    }, [unit]);

    const onSubmit = async (data) => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());

        let result = unitId
            ? await entity.store(
                  data.username,
                  data.password,
                  data.confirmPassword,
                  data.name,
                  data.family,
                  unitId
              )
            : await entity.storeAdmin(
                  data.username,
                  data.password,
                  data.confirmPassword,
                  data.name,
                  data.family
              );

        if (result === null) {
            dispatch(setLoadingAction(false));
            dispatch(
                setMessageAction(
                    entity.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    entity.errorCode
                )
            );

            return;
        }

        dispatch(
            setMessageAction(
                strings.submitted,
                MESSAGE_TYPES.SUCCESS,
                MESSAGE_CODES.OK,
                false
            )
        );

        navigate(callbackUrl);
    };

    const onCancel = () => {
        navigate(callbackUrl);
    };

    useEffect(() => {
        dispatch(setTitleAction(strings._title));

        fetchUnit();

        return () => {
            setIsCurrent(false);
        };
    }, []);

    const renderInputRow = (field, type = "text", placeholder = null) => {
        placeholder = placeholder
            ? placeholder
            : strings[`${field}Placeholder`];

        return (
            <div className="col-12 pb-4">
                <label className="form-label" htmlFor={field}>
                    {strings[field]}
                </label>
                <input
                    {...register(`${field}`)}
                    className={
                        messageState?.messageField === field
                            ? "form-control is-invalid"
                            : "form-control"
                    }
                    id={field}
                    placeholder={placeholder}
                    disabled={layoutState?.loading}
                    type={type}
                />
                {messageState?.messageField === field && (
                    <div className="invalid-feedback">
                        {messageState?.message}
                    </div>
                )}
            </div>
        );
    };

    const renderForm = () => (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    {renderInputRow("username")}
                    {renderInputRow("password", "password")}
                    {renderInputRow("confirmPassword", "password")}
                    {renderInputRow("name")}
                    {renderInputRow("family")}
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="btn btn-success px-4 ml-2"
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={layoutState?.loading}
                        >
                            {general.submit}
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={onCancel}
                            disabled={layoutState?.loading}
                        >
                            {general.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!isCurrent) <></>;

    return (
        <InsertPage page={"Users"} errors={errors}>
            <div className="row">
                <div className="col-12">{renderForm()}</div>
            </div>
        </InsertPage>
    );*/ <></>;
};

export default AddUser;
