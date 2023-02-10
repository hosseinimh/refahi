import { useSelector } from "react-redux";

import { MESSAGE_TYPES, USER_ROLES } from "../../../constants";
import { dashboardPage as strings } from "../../../constants/strings";
import { Dashboard as Entity } from "../../../http/entities";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import { setMessageAction } from "../../../state/message/messageActions";
import utils from "../../../utils/Utils";

let _dispatch;
let _navigate;
let _ls;
const _lsUser = utils.getLSUser();
let _pageProps;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _ls = useSelector((state) => state.layoutReducer);
};

export const onLoad = (params) => {
    _pageProps = {
        usersCount: 0,
    };

    _dispatch(setTitleAction(strings._title));
    _dispatch(setPagePropsAction(_pageProps));

    fillForm();
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchPageData(data);

    _dispatch(setLoadingAction(false));
};

const fetchPageData = async (data = null) => {
    let result =
        _lsUser?.role === USER_ROLES.ADMINISTRATOR
            ? await _entity.getAdminReview()
            : await _entity.getUserReview();

    if (result === null) {
        _dispatch(setPagePropsAction({ usersCount: 0 }));
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
        setPagePropsAction({
            usersCount: result.usersCount,
        })
    );
};
