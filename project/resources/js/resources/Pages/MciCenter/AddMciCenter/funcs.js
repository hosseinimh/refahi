import { City, MciCenter as Entity } from "../../../../http/entities";
import {
    general,
    addMciCenterPage as strings,
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
let _cityId;
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate, useForm) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _useForm = useForm;
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));

    setCityId(params?.cityId);
    fetchCity();

    _useForm.setValue("longitude", "0");
    _useForm.setValue("latitude", "0");
};

export const onLayoutState = () => {};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.store(
        _cityId,
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

const setCityId = (cityId) => {
    _cityId = !isNaN(cityId) && cityId > 0 ? cityId : 0;
};

const fetchCity = async () => {
    if (_cityId <= 0) {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _navigate(`${basePath}/provinces`);

        return null;
    }

    const city = new City();
    let result = await city.get(_cityId);

    if (result === null) {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _navigate(`${basePath}/provinces`);

        return null;
    }

    _callbackUrl = `${basePath}/mci_centers/${_cityId}`;

    _dispatch(setPagePropsAction({ city: result?.item }));
    _dispatch(
        setTitleAction(
            `${strings._title} [ ${result?.item?.provinceName} / ${result?.item?.name} ]`
        )
    );
};
