import { UserRoleLoca } from './user.role';

export class UserLoca {

    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phone: string;
    companyName: string;
    otp: string;
    token: string;
    isDeleted: string;
    roles: UserRoleLoca[];

    createdBy: number;
    createdTs: Date;
    updatedBy: number;
    updatedTs: Date;


    constructor(){

    }
}