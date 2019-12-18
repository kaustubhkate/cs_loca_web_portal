import { Role } from "./role";

export class User {
    public id:number;
    public category: string;
    public firstname:string;
    public lastname:string;
    public username:string;
    public email:string;
    public contactno:string;
    public password:string;
    public streetno:string;
    public streetname:string;
    public postalcode:string;
    public city:string;
    public province:string;
    public country:string;
    public token:string;
    public picture:string;
    public gender:string;
    public dob:any;
    public status:string;
    public loginAllowed : boolean;
    public company:string;
    public roles:Role[];
    public name:string;
    public rating:string;
    public staffCapability:string;
    public colone: string;
    
    constructor(){
        
    }
}