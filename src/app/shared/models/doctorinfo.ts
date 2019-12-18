import { Time } from "@angular/common";
import { Timestamp } from 'rxjs';

export class Doctorinfo {
/*
    id:number;
    fullname:string;
    salutation:string;
    clinicname:string;
    docdesc:string;
    email:string;
    doccategory:string;
    fees:string;
    availablefrom:Time;
    availableto:Time;
    contactno1:string;
    contactno2:string;
    faxno1:string;
    faxno2:string;
    referenceno:string
    status:string;
    checked:string;

*/


    createdBy: number;
    createdDate:  Date;
    lastModifiedBy: Date;
    lastModifiedDate: Date;
    id: number;
    name:string;
    referenceno: number;
    category:string;
    email: string;
    availablefrom:Time; 
    availableto:Time;
    contactno: string;
    phoneno:string ;
    faxno: string;
    streetno: number;
    streetname: string;
    postalcode:number
    city:string;
    province: string;
    country: string;
    fees: number;
    doctorcode: number;
    status: string;
    doctorname: string;
    doctordesc: string;
    companyCode: number;
    checked:string;
    constructor(){
        
    }
}
