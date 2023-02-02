import { EQUIPMENTS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Equipment extends Entity {
    constructor() {
        super();
    }

    async getPaginate(_pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_EQUIPMENTS, {
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_EQUIPMENT + "/" + id);
    }

    async store(equipmentTypeId, name) {
        return await this.handlePost(
            API_URLS.STORE_EQUIPMENT + "/" + equipmentTypeId,
            {
                name,
            }
        );
    }

    async update(id, equipmentTypeId, name) {
        return await this.handlePost(
            API_URLS.UPDATE_EQUIPMENT + "/" + id + "/" + equipmentTypeId,
            {
                name,
            }
        );
    }
}
