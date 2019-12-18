import { Role } from "./role";
export class staff{

    id: number;
    category:string ;
    firstname:string ;
    lastname:string ;
    username: string;
    email: string;
    contactno: string;
    password:string;
    streetno: string;
    streetname: string;
    postalcode: string;
    city: string;
    province: string;
    country: string;
    token: string;
    picture: string;
    gender: string;
    dob: any;
    status: string;
    loginAllowed: string;
    company: string;
    role:Role[];
    staffcapability:string[];
    constructor(){

    }
}