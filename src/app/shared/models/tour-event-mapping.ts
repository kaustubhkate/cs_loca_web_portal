import { Time } from "../../../../node_modules/@angular/common";

export class TourEventMapping {
    id:number;
    tourid:number;
    eventid:number;
    title:string;
    description:string;
    startdate:Date;
    enddate:Date;
    color:string;
    starttime:Time;
    endtime:Time;
    formattedfromdate:string;
    formattedtodate:string;
    constructor(){
        
    }
}
