import { Role } from "./role";

export class Volunteer {
    id: number;
    salutation:string;
    firstname: string;
    lastname: string;
    staffemail: string;
    staffcode:string;
    username: string;
    staffage: number;
    gender: string;
    password: string;
    streetno: string;
    streetname: string;
    postalcode: string;
    city: string;
    province: string;
    country: string;
    token: string;
    createdon: Date;
    contactno: string;
    picture: string;
    active: string;
    validtill: Date;
    staffrole:Role;
    status:string;
    checked:string;
    category:string;
    constructor() {

    }
}
