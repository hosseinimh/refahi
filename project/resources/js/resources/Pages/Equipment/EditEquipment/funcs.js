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
let _useForm;
let _equipmentId;
let _callbackUrl;
let _pageProps;
let _entity = new Entity();

export const init = (dispatch, navigate, useForm) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _useForm = useForm;
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

    fillForm();
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

    await fetchPageData();

    _dispatch(setLoadingAction(false));
};

const fetchPageData = async () => {
    if (_equipmentId <= 0) {
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

    _useForm.setValue("equipmentType", result.item.equipmentType);
    _useForm.setValue("name", result.item.name);
    _useForm.setValue("assetNo", result.item.assetNo);

    _pageProps = { ..._pageProps, equipmentTypes: result?.equipmentTypes };
    _dispatch(setTitleAction(`${strings._title} [ ${result.item.name} ]`));
    onChange(result.item.equipmentType);
    _dispatch(setPagePropsAction({ type: result.item.equipmentTypeId }));
    _dispatch(setLoadingAction(false));
};
