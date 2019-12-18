import { environment } from "../../../environments/environment";

export class RestApi {

    // public readonly API_URL = environment.baseUrl;
    public readonly API_URLS = environment.baseUrlS;
    public readonly HOMESTAY_URL = environment.homestayUrl;
    public readonly CATERER_URL = environment.catererUrl;
    public readonly INSURANCE_URL = environment.insuranceUrl;
    public readonly TRANSPORT_URL = environment.transportUrl;
    public readonly FCM_URL = environment.fcmUrl;

    //login API Service for LOCA (CheckSammy )
    public readonly LOGIN_URL = `${this.API_URLS}/loca/api/login`;
    public readonly USER_LOGIN_URL = `${this.API_URLS}/loca/api`;

    public readonly SAVE_ROLE_URL =  `${this.API_URLS}/loca/api/role/add`;
    public readonly DUMMY_URL =  `${this.API_URLS}/dummy_url_replace_it`;


    
    constructor() {

    }

}
