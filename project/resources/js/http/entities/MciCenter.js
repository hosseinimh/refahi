import { MCI_CENTERS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class MciCenter extends Entity {
    constructor() {
        super();
    }

    async getPaginate(cityId, _pn = 1, _pi = 10) {
        return await this.handlePost(
            API_URLS.FETCH_MCI_CENTERS + "/" + cityId,
            {
                _pn,
                _pi,
            }
        );
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_MCI_CENTER + "/" + id);
    }
}
