import { MciCenter as Entity } from "../../../../http/entities";
import {
    general,
    editMciCenterPage as strings,
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
let _setValue;
let _mciCenterId;
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate, setValue) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _setValue = setValue;
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
    setMciCenterId(params?.mciCenterId);

    _callbackUrl = `${basePath}/provinces`;

    if (_mciCenterId > 0) {
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
        _mciCenterId,
        data.name,
        data.tel,
        data.address,
        data.longitude,
        data.latitude
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

const setMciCenterId = (mciCenterId) => {
    _mciCenterId = !isNaN(mciCenterId) && mciCenterId > 0 ? mciCenterId : 0;
};

const fillForm = async () => {
    let result = await _entity.get(_mciCenterId);

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

    _callbackUrl = `${basePath}/mci_centers/${result?.item?.cityId}`;

    _setValue("name", result.item.name);
    _setValue("tel", result.item.tel);
    _setValue("address", result.item.address);
    _setValue("longitude", result.item.longitude);
    _setValue("latitude", result.item.latitude);

    _dispatch(setTitleAction(`${strings._title} [ ${result.item.name} ]`));
};
