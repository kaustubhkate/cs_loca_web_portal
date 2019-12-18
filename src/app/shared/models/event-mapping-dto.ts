import { Volunteer } from "./volunteer";
import { Presenter } from "./presenter";
import { Venue } from "./venue";
import { Geofencing } from "./geofencing";
import { TransportProfile } from "./transport-profile";
import { CatererProfile } from "./caterer-profile";

export class EventMappingDto {

    eventId:number;
	staffs:Volunteer[];
	presenters:Presenter[];
	venues:Venue[];
    geofences:Geofencing[];
    transportprofiles:TransportProfile[];
    catererprofiles:CatererProfile[];
    
    constructor(){
        
    }
}
