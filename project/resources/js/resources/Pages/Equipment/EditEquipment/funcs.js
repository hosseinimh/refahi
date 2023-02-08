import { EquipmentType, Equipment as Entity } from "../../../../http/entities";
import {
    general,
    editEquipmentPage as strings,
} from "../../../../constants/strings";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageActions";
import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";

let _dispatch;
let _navigate;
let _setValue;
let _equipmentId;
let _callbackUrl;
let _pageProps;
let _entity = new Entity();

export const init = (dispatch, navigate, setValue) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _setValue = setValue;
};

export const onLoad = (params) => {
    _pageProps = {
        type: null,
        equipmentTypes: null,
    };

    _dispatch(setTitleAction(strings._title));
    _dispatch(setPagePropsAction(_pageProps));
    setEquipmentId(params?.equipmentId);

    _callbackUrl = `${basePath}/equipments`;

    if (_equipmentId > 0) {
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

    let result = await _entity.update(
        _equipmentId,
        data.type,
        data.name,
        data.assetNo
    );

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

export const onChange = (value) => {
    const items = _pageProps?.equipmentTypes?.filter((t) => t.type == value);

    _dispatch(setPagePropsAction({ type: null, equipmentTypes: items }));
};

const setEquipmentId = (equipmentId) => {
    _equipmentId = !isNaN(equipmentId) && equipmentId > 0 ? equipmentId : 0;
};

const fillForm = async () => {
    _dispatch(setLoadingAction(true));

    await fetchEquipmentTypes();
    let result = await _entity.get(_equipmentId);

    if (result === null) {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _dispatch(setLoadingAction(false));
        _navigate(_callbackUrl);

        return null;
    }

    _callbackUrl = `${basePath}/equipments`;

    onChange(result.item.equipmentType);
    _setValue("equipmentType", result.item.equipmentType);
    _setValue("name", result.item.name);
    _setValue("assetNo", result.item.assetNo);

    _dispatch(setTitleAction(`${strings._title} [ ${result.item.name} ]`));
    _dispatch(setPagePropsAction({ type: result.item.equipmentTypeId }));
    _dispatch(setLoadingAction(false));
};

const fetchEquipmentTypes = async () => {
    const equipmentType = new EquipmentType();
    const result = await equipmentType.getAll();

    if (result === null) {
        _pageProps = { ..._pageProps, equipmentTypes: null };
    } else {
        _pageProps = { ..._pageProps, equipmentTypes: result?.items };
    }
};
