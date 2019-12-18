import { Guardianinfo } from "./guardianinfo";
import { TourPayment } from "./tour-payment";

export class CandidateAdd {
    id: number;
    tourid:number
    salutation:string;
    firstname: string;
    middlename:string;
    nickname:string;
    gender:string;
    dob:any;
    citizenship:string;
    lastname: string;
    emailid: string;
    contactno: string;
    altercontactno: string;
    streetno: string;
    streetname: string;
    city: string;
    postalcode: string;
    state: string;
    country: string;
    govidname1: string;
    preferredname: string;
    schoolname:string;
    schoolcity:string;
    schoolcountry:string;
    schoolgrade:string;
    emergencyfirstname:string;
    emergencylastname:string;
    emergencycontactrelation:string;
    emergencyemail:string;
    emergencycontactno:string;
    mailingaddressline1:string;
    mailingaddressline2:string;
    mailingcity:string;
    mailingprovince:string;
    mailingcountry:string;
    mailingzip:string;
    govidno1: string;
    username: string;
    roompreference:string;
    tourpayment:TourPayment;
    guardianInfos:Guardianinfo[];
    constructor(){
        
    }
}
