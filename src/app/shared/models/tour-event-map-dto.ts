import { Time } from "../../../../node_modules/@angular/common";
export class TourEventMapDto {

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
    venueid:number;
    presenterIds:number[];
    counselorIds:number[];
    constructor(){
        
    }
}
