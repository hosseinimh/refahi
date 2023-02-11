import { EquipmentType as Entity } from "../../../../http/entities";
import {
    general,
    editEquipmentTypePage as strings,
} from "../../../../constants/strings";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageActions";
import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";

let _dispatch;
let _navigate;
let _useForm;
let _equipmentTypeId;
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate, useForm) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _useForm = useForm;
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
    setEquipmentTypeId(params?.equipmentTypeId);

    _callbackUrl = `${basePath}/equipment_types`;

    if (_equipmentTypeId > 0) {
        fillForm();
    } else {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _navigate(_callbackUrl);
    }
};

export const onLayoutState = () => {};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.update(_equipmentTypeId, data.name, data.type);

    if (result === null) {
        _dispatch(setLoadingAction(false));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(
        setMessageAction(
            strings.submitted,
            MESSAGE_TYPES.SUCCESS,
            MESSAGE_CODES.OK,
            false
        )
    );

    _navigate(_callbackUrl);
};

export const onCancel = () => {
    _navigate(_callbackUrl);
};

const setEquipmentTypeId = (equipmentTypeId) => {
    _equipmentTypeId =
        !isNaN(equipmentTypeId) && equipmentTypeId > 0 ? equipmentTypeId : 0;
};

const fillForm = async () => {
    let result = await _entity.get(_equipmentTypeId);

    if (result === null) {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _navigate(_callbackUrl);

        return null;
    }

    _callbackUrl = `${basePath}/equipment_types`;

    _useForm.setValue("name", result.item.name);
    _useForm.setValue("type", result.item.type);

    _dispatch(setTitleAction(`${strings._title} [ ${result.item.name} ]`));
};
