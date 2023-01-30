import { useSelector } from "react-redux";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import { general, citiesPage as strings } from "../../../../constants/strings";
import { Province, City as Entity } from "../../../../http/entities";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../state/message/messageActions";

let _dispatch;
let _navigate;
let _ls;
let _provinceId;
let _pageProps;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _ls = useSelector((state) => state.layoutReducer);
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
    setProvinceId(params?.provinceId);
    _dispatch(
        setPagePropsAction({
            provinceId: null,
            item: null,
            items: null,
            action: null,
        })
    );

    fillForm();
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }

    if (_ls?.pageProps?.pageNumber !== _pageProps?.pageNumber) {
        _pageProps = _ls?.pageProps;

        fillForm();

        return;
    }

    if (_ls?.pageProps?.action) {
        _dispatch(setPagePropsAction({ action: null }));
    }

    switch (_ls?.pageProps?.action) {
        case "MCI_CENTERS":
            mciCentersAction(_ls?.pageProps?.item);

            return;
    }
};

export const onMciCenters = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "MCI_CENTERS",
            item,
        })
    );
};

const mciCentersAction = (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _navigate(`${basePath}/mci_centers/${item.id}`);
    }
};

const setProvinceId = (provinceId) => {
    _provinceId = !isNaN(provinceId) && provinceId > 0 ? provinceId : 0;
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchProvince();
    await fetchCities(data);

    _dispatch(setLoadingAction(false));
};

const fetchProvince = async () => {
    if (_provinceId <= 0) {
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

    const province = new Province();
    let result = await province.get(_provinceId);

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

    _dispatch(setPagePropsAction({ province: result?.item }));
    _dispatch(setTitleAction(`${strings._title} [ ${result?.item?.name} ]`));
};

const fetchCities = async (data = null) => {
    let result = await _entity.getAll(_provinceId);

    if (result === null) {
        _dispatch(setPagePropsAction({ items: null }));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(setPagePropsAction({ items: result.items }));
};
