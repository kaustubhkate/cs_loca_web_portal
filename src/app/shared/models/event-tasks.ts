import {  EventSubTaskModal  } from './event-subtasks';
export class EventTaskModal {
    id:number;
    taskName:string;
    taskDescription:string;
    origin:string;
    userId:number;
    taskStartDT:Date;
    taskEndDT:Date;
    subtasks: any;
    constructor() {
    }
}