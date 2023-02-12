import { User as Entity } from "../../../../http/entities";
import {
    general,
    changePasswordUserPage as strings,
} from "../../../../constants/strings";
import {
    setLoadingAction,
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
import utils from "../../../../utils/Utils";

let _dispatch;
let _navigate;
let _userId;
const _lsUser = utils.getLSUser();
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
    setUserId(params?.userId);

    _callbackUrl =
        _lsUser?.role === USER_ROLES.ADMINISTRATOR
            ? `${basePath}/users`
            : basePath;

    fillForm();
};

export const onLayoutState = () => {};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.changePasswordUser(
        _userId,
        data.newPassword,
        data.confirmPassword
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
    _userId =
        _lsUser?.role === USER_ROLES.ADMINISTRATOR
            ? !isNaN(userId) && userId > 0
                ? userId
                : _lsUser?.id
            : _lsUser?.id;
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

    let result =
        _lsUser?.role === USER_ROLES.ADMINISTRATOR
            ? await _entity.getAdministrator(_userId)
            : await _entity.getUser();

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

    _dispatch(
        setTitleAction(
            `${strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.username} ]`
        )
    );
};
