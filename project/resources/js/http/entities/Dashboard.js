import { DASHBOARD_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Dashboard extends Entity {
    constructor() {
        super();
    }

    async getUserReview() {
        return await this.handlePost(API_URLS.FETCH_USER_REVIEW, {});
    }

    async getAdminReview() {
        return await this.handlePost(API_URLS.FETCH_ADMIN_REVIEW, {});
    }
}
