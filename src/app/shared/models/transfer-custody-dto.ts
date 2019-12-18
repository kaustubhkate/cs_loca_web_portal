import { Candidate } from "./candidate";
import { Volunteer } from "./volunteer";

export class TransferCustodyDto {

    staffid:Volunteer;
    candidates:Candidate[];

    constructor() {
    }
}
