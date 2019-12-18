import { Time } from "@angular/common";
import { InventoryMulitpleConsume } from "./inventorymultipleconsume";

export class TourEventMappingDto {
    id: number;
    tourid: number;
    eventid: number;
    venueid: number;
    inventoryid: number;
    categoryid: number;
    startdate: Date;
    enddate: Date;
    starttime: Date;
    endtime: Date;
    eventname:string;
    description:string;
    picture:string;
    color:string;
    presenterid:number[];
    counselorid:number[];
    status:string;
    dayAccess:number[];
    fencearea:string;
    categoryname:string;
    constructor(){
        
    }


}
