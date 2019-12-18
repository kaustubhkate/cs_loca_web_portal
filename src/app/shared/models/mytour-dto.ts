import { TourCategory } from './tour-category';

export class MytourDto {
    id: number;
    name:string;
    description:string;
    institute:string;
    requestby:string;
    startdate:Date;
    enddate:Date;
    amount:number;
    status:string;
    tourcode:string;
    totalseats:number;
    minseats:number;
    managerid:number;
    categoryid:TourCategory;
    staffid:number[];
    companyCode:string;
    managername:string;
    colfour:string;
    constructor(){
        
    }
}
