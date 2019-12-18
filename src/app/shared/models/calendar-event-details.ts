import { Time } from "../../../../node_modules/@angular/common";

export class CalendarEventDetails {
    id:number;
    tourid:number;
    eventid:number;
    title:string;
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
