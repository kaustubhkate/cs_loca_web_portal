import { Time } from "@angular/common";

export class EventModel {

    id:number;
    eventname:string;
    eventstatus:string;
    comments:string;
    categoryid:number;
    categoryname:string;
    eventcode:string;
    starttime:Time;
    endtime:Time;
    formattefromddate:string;
    formattetoddate:string;
    filedata:string;

    constructor(){

    }
}
