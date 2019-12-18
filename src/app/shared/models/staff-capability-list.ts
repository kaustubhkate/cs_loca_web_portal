export class StaffCapabilityList{
   capabilitylist:string[];
    constructor(){
    }        
}
export class CapabilityData{
    id:number;
    staffid:number;
    list:Proficiency[];
    isEdit:boolean;
    constructor(){
    } 
 }


 
export interface Proficiency{
    id:number;
    capabilityname:string;
    proficiency:string;
    
  }