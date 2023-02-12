const serverConfig = require("../../../server-config.json");
const { baseUrl } = serverConfig;

export const SERVER_URL = `${baseUrl}/api`;

export const DASHBOARD_API_URLS = {
    FETCH_USER_REVIEW: `${SERVER_URL}/dashboard/review_user`,
    FETCH_ADMIN_REVIEW: `${SERVER_URL}/dashboard/review_admin`,
};

export const USERS_API_URLS = {
    LOGIN: `${SERVER_URL}/users/login`,
    LOGOUT: `${SERVER_URL}/users/logout`,
    FETCH_USER: `${SERVER_URL}/users/show`,
    FETCH_USER_CITIES: `${SERVER_URL}/users/show/cities`,
    FETCH_USERS: `${SERVER_URL}/users`,
    STORE_USER: `${SERVER_URL}/users/store`,
    UPDATE_USER: `${SERVER_URL}/users/update`,
    CHANGE_PASSWORD: `${SERVER_URL}/users/change_password`,
};

export const PROVINCES_API_URLS = {
    FETCH_PROVINCE: `${SERVER_URL}/provinces/show`,
    FETCH_PROVINCES: `${SERVER_URL}/provinces`,
};

export const CITIES_API_URLS = {
    FETCH_CITY: `${SERVER_URL}/cities/show`,
    FETCH_CITIES: `${SERVER_URL}/cities`,
    FETCH_CITIES_ALL: `${SERVER_URL}/cities/all`,
};

export const MCI_CENTERS_API_URLS = {
    FETCH_MCI_CENTER: `${SERVER_URL}/mci_centers/show`,
    FETCH_MCI_CENTERS: `${SERVER_URL}/mci_centers`,
    STORE_MCI_CENTER: `${SERVER_URL}/mci_centers/store`,
    UPDATE_MCI_CENTER: `${SERVER_URL}/mci_centers/update`,
};

export const EQUIPMENT_TYPES_API_URLS = {
    FETCH_EQUIPMENT_TYPE: `${SERVER_URL}/equipment_types/show`,
    FETCH_EQUIPMENT_TYPES: `${SERVER_URL}/equipment_types`,
    FETCH_ALL_EQUIPMENT_TYPES: `${SERVER_URL}/equipment_types/all`,
    STORE_EQUIPMENT_TYPE: `${SERVER_URL}/equipment_types/store`,
    UPDATE_EQUIPMENT_TYPE: `${SERVER_URL}/equipment_types/update`,
};

export const EQUIPMENTS_API_URLS = {
    FETCH_EQUIPMENT: `${SERVER_URL}/equipments/show`,
    FETCH_EQUIPMENTS: `${SERVER_URL}/equipments`,
    STORE_EQUIPMENT: `${SERVER_URL}/equipments/store`,
    UPDATE_EQUIPMENT: `${SERVER_URL}/equipments/update`,
};

export const PLACE_TYPES_API_URLS = {
    FETCH_PLACE_TYPE: `${SERVER_URL}/place_types/show`,
    FETCH_PLACE_TYPES: `${SERVER_URL}/place_types`,
    FETCH_ALL_PLACE_TYPES: `${SERVER_URL}/place_types/all`,
    STORE_PLACE_TYPE: `${SERVER_URL}/place_types/store`,
    UPDATE_PLACE_TYPE: `${SERVER_URL}/place_types/update`,
};
