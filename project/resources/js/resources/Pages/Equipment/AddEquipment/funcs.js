import { EquipmentType, Equipment as Entity } from "../../../../http/entities";
import { addEquipmentPage as strings } from "../../../../constants/strings";
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
let _callbackUrl;
let _pageProps;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;

    _callbackUrl = `${basePath}/equipments`;
};

export const onLoad = (params) => {
    _pageProps = {
        type: null,
        equipmentTypes: null,
    };

    _dispatch(setTitleAction(strings._title));
    _dispatch(setPagePropsAction(_pageProps));

    fillForm();
};

export const onLayoutState = () => {};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.store(data.type, data.name);

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

export const onChange = (e) => {
    const items = _pageProps?.equipmentTypes?.filter(
        (t) => t.type == e?.target?.value
    );

    _dispatch(
        setPagePropsAction({ type: e?.target?.value, equipmentTypes: items })
    );
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchEquipmentTypes(data);

    _dispatch(setLoadingAction(false));
};

const fetchEquipmentTypes = async () => {
    _dispatch(setLoadingAction(false));

    const equipmentType = new EquipmentType();
    const result = await equipmentType.getAll();

    if (result === null) {
        _pageProps = { ..._pageProps, equipmentTypes: null };
    } else {
        _pageProps = { ..._pageProps, equipmentTypes: result?.items };
    }

    _dispatch(setLoadingAction(false));
};
