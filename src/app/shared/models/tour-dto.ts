import { Events } from "./events";
import { TourEventMapping } from "./tour-event-mapping";
import { InventoryMulitpleConsume } from "./inventorymultipleconsume";

export class TourDto {
    id: number;
    tourName:string;
    tourDescription:string;
    startDate:Date;
    endDate:Date;
    status:string;
    amount:number;
    managerid:number;
    managername:string;
    totalseats:number;
    minseats:number;
    eventDtos:Events[];
    eventMappings:TourEventMapping[];
    inventoryConsumes:InventoryMulitpleConsume[];
    constructor(){

    }
}
