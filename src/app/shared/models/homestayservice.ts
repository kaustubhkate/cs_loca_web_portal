import { ServiceItem } from "./service-item";

export class Homestayservice {
    
    id: number;
    mincount: number;
    maxcount: number;
    type:string;
    count:number;
    unit: number;
    servicecode: string;
    servicename: string;
    servicedescription: string;
    cost: number;
    mode: string;
    status: string;
    homestayid:number;
    ownername:string;
    items:ServiceItem[];
    propertytypeid: number;
    propertyid: number;
    propertytypename: string;
    propertyname:string;
    servicestatus:string;
    checked:string;
    constructor(){
    }
}
