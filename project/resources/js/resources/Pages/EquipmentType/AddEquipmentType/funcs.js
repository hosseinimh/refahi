import { EquipmentType as Entity } from "../../../../http/entities";
import { addEquipmentTypePage as strings } from "../../../../constants/strings";
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
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;

    _callbackUrl = `${basePath}/equipment_types`;
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
};

export const onLayoutState = () => {};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.store(data.name, data.type);

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

    _dispatch(setLoadingAction(false));
    _navigate(_callbackUrl);
};

export const onCancel = () => {
    _navigate(_callbackUrl);
};
