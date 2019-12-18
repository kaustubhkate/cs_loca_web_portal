import { RolePermission } from "./role-permission";

export class Role{
    // id:number;
    // role:string;
    // description:string;
    // status:string;
    // rolePermissionList:RolePermission[];

    id:number;
    name:string;
    status:string;
    createdBy:string;
    createdDate:string;
    lastModifiedBy:string;
    lastModifiedDate:string;
    description:string;
    constructor(){

    }
}