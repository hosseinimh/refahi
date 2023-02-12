import { useSelector } from "react-redux";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import {
    general,
    mciCentersPage as strings,
} from "../../../../constants/strings";
import { City, MciCenter as Entity } from "../../../../http/entities";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../state/message/messageActions";

let _dispatch;
let _navigate;
let _ls;
let _cityId;
let _pageProps;
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _ls = useSelector((state) => state.layoutReducer);
};

export const onLoad = (params) => {
    _pageProps = {
        pageNumber: 1,
        itemsCount: 0,
        province: null,
        city: null,
        item: null,
        items: null,
        action: null,
    };
    _callbackUrl = `${basePath}/provinces`;

    _dispatch(setTitleAction(strings._title));
    _dispatch(setPagePropsAction(_pageProps));

    setCityId(params?.cityId);
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
        case "ADD":
            addAction();

            return;
        case "EDIT":
            editAction(_ls?.pageProps?.item);

            return;
    }
};

export const onAdd = () => {
    _dispatch(setPagePropsAction({ action: "ADD" }));
};

export const onEdit = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "EDIT",
            item,
        })
    );
};

export const setPage = (page) => {
    _dispatch(setPagePropsAction({ pageNumber: page }));
};

const setCityId = (cityId) => {
    _cityId = !isNaN(cityId) && cityId > 0 ? cityId : 0;
};

const addAction = () => {
    _navigate(`${basePath}/mci_centers/add/${_cityId}`);
};

const editAction = (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _navigate(`${basePath}/mci_centers/edit/${item.id}`);
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchPageData(data);

    _dispatch(setLoadingAction(false));
};

const fetchPageData = async () => {
    if (_cityId <= 0) {
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

    let result = await _entity.getPaginate(
        _cityId,
        _ls?.pageProps?.pageNumber ?? 1
    );

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

    _callbackUrl = `${basePath}/cities/${result.province.id}`;

    _dispatch(
        setTitleAction(
            `${strings._title} [ ${result.province.name} / ${result.city.name} ]`
        )
    );
    _dispatch(
        setPagePropsAction({
            items: result.items,
            province: result.province,
            city: result.city,
            itemsCount: result.count,
        })
    );
};
