import { PLACE_TYPES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class PlaceType extends Entity {
    constructor() {
        super();
    }

    async getPaginate(_pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_ALL_PLACE_TYPES, {
            _pn,
            _pi,
        });
    }

    async getAll(type = 0) {
        return await this.handlePost(API_URLS.FETCH_ALL_PLACE_TYPES, {
            type,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_PLACE_TYPE + "/" + id);
    }

    async store(name, type) {
        return await this.handlePost(API_URLS.STORE_PLACE_TYPE, {
            name,
            type,
        });
    }

    async update(id, name, type) {
        return await this.handlePost(API_URLS.UPDATE_PLACE_TYPE + "/" + id, {
            name,
            type,
        });
    }
}
