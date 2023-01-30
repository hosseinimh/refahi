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
    FETCH_USERS: `${SERVER_URL}/users`,
    STORE_USER: `${SERVER_URL}/users/store`,
    STORE_ADMIN: `${SERVER_URL}/users/store_admin`,
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
};

export const MCI_CENTERS_API_URLS = {
    FETCH_MCI_CENTER: `${SERVER_URL}/mci_centers/show`,
    FETCH_MCI_CENTERS: `${SERVER_URL}/mci_centers`,
};

export const EQUIPMENTS_API_URLS = {
    FETCH_EQUIPMENT: `${SERVER_URL}/equipments/show`,
    FETCH_EQUIPMENTS: `${SERVER_URL}/equipments`,
    STORE_EQUIPMENT: `${SERVER_URL}/equipments/store`,
    UPDATE_EQUIPMENT: `${SERVER_URL}/equipments/update`,
};