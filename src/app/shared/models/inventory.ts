export class Inventory {

    id:number;
	itemtype:string;
	itemcode:string;
	itemname:string;
	unit:string;
	description:string;
	amount:DoubleRange;
	reorderpoint:number;
	quantity:number;
    status:string;
    
    constructor(){
        
    }
}
