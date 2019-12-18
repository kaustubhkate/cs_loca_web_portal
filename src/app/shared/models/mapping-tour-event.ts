import { Time } from "../../../../node_modules/@angular/common";

export class MappingTourEvent {

    id: number;
    tourid: number;
    eventid: number;
    title: string;
    startdate: Date;
    enddate: Date;
    starttime:Time;
    endtime:Time;
    color: string;

    constructor(){
    }
}
