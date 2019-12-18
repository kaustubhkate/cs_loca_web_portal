import { Time } from "../../../../node_modules/@angular/common";

export class Geofencing {
    geofencingid: number;
    status: string;
    geofencingname: string;
    geofencingdescription: string;
    duration: number;
    radius: string;
    starttime: Time;
    endtime: Time;
    checked:string;

    constructor() {

    }
}
