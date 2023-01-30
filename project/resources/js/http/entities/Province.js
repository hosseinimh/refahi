import { PROVINCES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Province extends Entity {
    constructor() {
        super();
    }

    async getAll() {
        return await this.handlePost(API_URLS.FETCH_PROVINCES);
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_PROVINCE + "/" + id);
    }
}
