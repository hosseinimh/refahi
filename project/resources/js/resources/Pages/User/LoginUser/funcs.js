import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { clearMessageAction } from "../../../../state/message/messageActions";
import { fetchLoginAction } from "../../../../state/user/userActions";

let _dispatch;
let _navigate;

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
};

export const onLoad = (params) => {};

export const onLayoutState = () => {};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());
    _dispatch(fetchLoginAction(data.username, data.password));
};
