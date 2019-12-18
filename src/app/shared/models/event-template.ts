import { EventTaskModal } from './event-tasks'
export class EventTemplateModel {
    id: number;
    templateName: string;
    templateStatus: boolean;
    templateDescription: string;
    userId:number;
    origin:string;
    taskList: EventTaskModal[];
    constructor(){
    }
}