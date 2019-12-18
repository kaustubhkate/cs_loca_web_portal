import { Doctorinfo } from "./doctorinfo";
import { Volunteer } from "./volunteer";
import { TransportProfile } from "./transport-profile";
import { Homestayprofile } from "./homestayprofile";
import { InsuranceProfile } from "./insurance-profile";

export class TourMappingsecondDto {
    tourId:number;
    doctors:Doctorinfo[];
    staffs:Volunteer[];
    teachers:Volunteer[];
    homestayProfiles:Homestayprofile[];
    transportationProfileDtos:TransportProfile[];
    insuranceProfileDtos:InsuranceProfile[];
    
    constructor(){
        
    }
}


