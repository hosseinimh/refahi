import { CITIES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class City extends Entity {
    constructor() {
        super();
    }

    async getAll(provinceId) {
        return await this.handlePost(API_URLS.FETCH_CITIES + "/" + provinceId);
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_CITY + "/" + id);
    }
}
