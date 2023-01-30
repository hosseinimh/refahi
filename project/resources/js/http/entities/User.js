import { USERS_API_URLS as API_URLS } from "../../constants";
import utils from "../../utils/Utils";
import Entity from "./Entity";

export class User extends Entity {
    constructor() {
        super();
    }

    async getPaginate(username, name, cityId, _pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_USERS, {
            username: username,
            name: name,
            city_id: cityId,
            _pn,
            _pi,
        });
    }

    async getUser() {
        return await this.handlePost(API_URLS.FETCH_USER);
    }

    async getAdmin(id) {
        return await this.handlePost(API_URLS.FETCH_USER + "/" + id);
    }

    async store(username, password, passwordConfirmed, name, family, unitId) {
        return await this.handlePost(API_URLS.STORE_USER + "/" + unitId, {
            username: username,
            password: password,
            password_confirmation: passwordConfirmed,
            name: name,
            family: family,
        });
    }

    async storeAdmin(username, password, passwordConfirmed, name, family) {
        return await this.handlePost(API_URLS.STORE_ADMIN, {
            username: username,
            password: password,
            password_confirmation: passwordConfirmed,
            name: name,
            family: family,
        });
    }

    async update(id, name, family) {
        return await this.handlePost(API_URLS.UPDATE_USER + "/" + id, {
            name: name,
            family: family,
        });
    }

    async changePassword(id, newPassword, confirmPassword) {
        return await this.handlePost(API_URLS.CHANGE_PASSWORD + "/" + id, {
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        });
    }

    logOut() {
        utils.clearLS();
    }
}
