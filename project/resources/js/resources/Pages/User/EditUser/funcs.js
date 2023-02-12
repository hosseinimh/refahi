import { City, User as Entity } from "../../../../http/entities";
import { useSelector } from "react-redux";

import {
    editUserPage as strings,
    general,
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
let _userId;
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
    setUserId(params?.userId);

    _dispatch(setTitleAction(strings._title));
    _dispatch(setPagePropsAction(_pageProps));

    if (_userId > 0) {
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
        case "CITIES":
            onCitySubmit({ modalCity: _ls?.pageProps?.city });

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
            ? await _entity.updateAdministrator(
                  _userId,
                  data.name,
                  data.family,
                  data.nationalCode,
                  data.personnelNo,
                  data.mobile,
                  data.email,
                  data.gender ? 1 : 0,
                  data.isActive ? 1 : 0
              )
            : await _entity.updateUser(
                  _userId,
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

const setUserId = (userId) => {
    _userId = !isNaN(userId) && userId > 0 ? userId : 0;
};

const citiesAction = () => {
    _dispatch(
        setPagePropsAction({
            action: "CITIES",
        })
    );
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
    if (_userId <= 0) {
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

    let result = await _entity.getAdministratorWithCities(_userId);

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

    _useForm.setValue("name", result.item.name);
    _useForm.setValue("family", result.item.family);
    _useForm.setValue("nationalCode", result.item.nationalCode);
    _useForm.setValue("personnelNo", result.item.personnelNo);
    _useForm.setValue("mobile", result.item.mobile);
    _useForm.setValue("email", result.item.email);
    _useForm.setValue(result.item.gender === 1 ? "female" : "male", "on");
    _useForm.setValue("active", result.item.isActive);
    _useForm.setValue(
        result.item.role === USER_ROLES.ADMINISTRATOR
            ? "administrator"
            : "user",
        "on"
    );
    onType(
        result.item.role === USER_ROLES.ADMINISTRATOR ? "administrator" : "user"
    );

    _dispatch(
        setPagePropsAction({
            city: result.item.cityId,
            provinces: result.provinces,
            cities: result.cities,
        })
    );
    citiesAction();

    _dispatch(
        setTitleAction(
            `${strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.username} ]`
        )
    );
    _dispatch(setLoadingAction(false));
};
