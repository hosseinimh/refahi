import { City, User as Entity } from "../../../../http/entities";
import { useSelector } from "react-redux";

import { addUserPage as strings } from "../../../../constants/strings";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageActions";
import {
    basePath,
    MESSAGE_CODES,
    MESSAGE_TYPES,
    USER_ROLES,
} from "../../../../constants";

let _dispatch;
let _navigate;
let _useForm;
let _ls;
let _pageProps;
let _callbackUrl;
let _modals;
let _entity = new Entity();

export const init = (dispatch, navigate, useForm) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _useForm = useForm;
    _ls = useSelector((state) => state.layoutReducer);

    _callbackUrl = `${basePath}/users`;
};

export const onLoad = (params) => {
    _pageProps = {
        userType: USER_ROLES.ADMINISTRATOR,
        city: null,
        provinces: null,
        cities: null,
        action: null,
    };

    _useForm.setValue("city", 0);
    _dispatch(setPagePropsAction(_pageProps));

    fillForm();

    _dispatch(setTitleAction(strings._title));
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }

    if (_ls?.pageProps?.action) {
        _dispatch(setPagePropsAction({ action: null }));
    }

    switch (_ls?.pageProps?.action) {
        case "SELECT_CITY":
            selectCityAction();

            return;
    }
};

export const loadModals = (modals) => {
    _modals = modals;
};

export const onType = (field) => {
    if (field === "administrator") {
        _dispatch(setPagePropsAction({ userType: USER_ROLES.ADMINISTRATOR }));
    } else {
        _dispatch(setPagePropsAction({ userType: USER_ROLES.USER }));
    }
};

export const onSelectCity = () => {
    _dispatch(setPagePropsAction({ action: "SELECT_CITY" }));
};

export const onRemoveCity = () => {
    _useForm.setValue("city", 0);
    _dispatch(setPagePropsAction({ city: null }));
};

export const onCitySubmit = async (data) => {
    const cities = _ls?.pageProps?.cities?.filter(
        (city) => city.id == data.modalCity
    );

    if (cities?.length > 0) {
        _dispatch(setPagePropsAction({ city: cities[0] }));
        _useForm.setValue("city", data.modalCity);
        _modals[0].modal.hide();
    }
};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let city = parseInt(data.city);

    if (
        _ls?.pageProps?.userType === USER_ROLES.USER &&
        (isNaN(city) || city <= 0)
    ) {
        _dispatch(setLoadingAction(false));
        _dispatch(
            setMessageAction(
                strings.noCity,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.FORM_INPUT_INVALID
            )
        );

        return;
    }

    let result =
        _ls?.pageProps?.userType === USER_ROLES.ADMINISTRATOR
            ? await _entity.storeAdmininistrator(
                  data.username,
                  data.password,
                  data.confirmPassword,
                  data.name,
                  data.family,
                  data.nationalCode,
                  data.mobile,
                  data.email,
                  data.gender ? 1 : 0,
                  data.isActive ? 1 : 0
              )
            : await _entity.storeUser(
                  data.username,
                  data.password,
                  data.confirmPassword,
                  data.name,
                  data.family,
                  data.nationalCode,
                  data.personnelNo,
                  data.mobile,
                  data.email,
                  data.city,
                  data.gender ? 1 : 0,
                  data.isActive ? 1 : 0
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

const selectCityAction = () => {
    _modals[0].modal.show();
};

const fillForm = async () => {
    _dispatch(setLoadingAction(true));

    await fetchPageData();

    _dispatch(setLoadingAction(false));
};

const fetchPageData = async () => {
    const city = new City();
    let result = await city.getAllWithProvinces();

    if (result === null) {
        _dispatch(setPagePropsAction({ cities: null }));
        _dispatch(
            setMessageAction(
                city.errorMessage,
                MESSAGE_TYPES.ERROR,
                city.errorCode
            )
        );

        return;
    }

    _dispatch(
        setPagePropsAction({
            provinces: result.provinces,
            cities: result.items,
        })
    );
};
