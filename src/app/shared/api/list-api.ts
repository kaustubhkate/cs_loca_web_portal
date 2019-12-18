import { RestApi } from "./rest-api";
import { environment } from '../../../environments/environment';

export class ListApi {

    api = new RestApi();

    public readonly CANDIDATE_LIST_URL = `${this.api}`;
    public readonly CANDIDATE_LSIT_URL2 = environment.baseUrlS + 'api/candidate';
    // public readonly TOUR_LIST_URL = this.api.TOUR_URL + '/list';

    public readonly TOUR_LIST_URL = `${this.api.API_URLS}/api/tour`;
    public readonly DUPLICATE_TOUR_LIST_URL = `${this.api.API_URLS}/api/duplicatetour`;

    // public readonly TOUR_LIST_URL = `http://localhost:8888/api/auth/tour`;
    // public readonly TOUR_LIST_URL = `http://192.168.15.130:8080/experience/api/auth/tour`;
    // public readonly EVENT_LIST_URL = this.api.EVENTS_URL + '/list';

    public readonly TASK_LIST = this.api.API_URLS + '/api/task';
    public readonly EVENT_TEMPLATE = this.api.API_URLS + '/api/tasknew/web';
    public readonly TASK_LIST_NEW = this.api.API_URLS + '/api/tasknew/web/master/list';
    public readonly TEMPLATE_LIST = this.api.API_URLS + '/api/template';
    public readonly TEMPLATE_MASTER = this.api.API_URLS + '/api/templateMaster';

    /** DUMMY url */
    public readonly DUMMY_URL = this.api.API_URLS + '/api/templateMaster';
    
    public readonly ALL_USER_LIST = this.api.API_URLS + '/loca/api/user/getall';
    public readonly ALL_ROLE_LIST = this.api.API_URLS + '/loca/api/role/getall';
    

    constructor(){

    }
}
