import { EQUIPMENT_TYPES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class EquipmentType extends Entity {
    constructor() {
        super();
    }

    async getPaginate(_pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_EQUIPMENT_TYPES, {
            _pn,
            _pi,
        });
    }

    async getAll(type = 0) {
        return await this.handlePost(API_URLS.FETCH_ALL_EQUIPMENT_TYPES, {
            type,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_EQUIPMENT_TYPE + "/" + id);
    }

    async store(name, type) {
        return await this.handlePost(API_URLS.STORE_EQUIPMENT_TYPE, {
            name,
            type,
        });
    }

    async update(id, name, type) {
        return await this.handlePost(
            API_URLS.UPDATE_EQUIPMENT_TYPE + "/" + id,
            {
                name,
                type,
            }
        );
    }
}
