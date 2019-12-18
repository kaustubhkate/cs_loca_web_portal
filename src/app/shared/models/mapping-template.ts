import { NewTask } from './task-model-new';

export class MappingTemplate {

  //  id:number;
    tourid: number;
    calendarid: number;
    eventid: number;
    templateid: number;
    templatename: string;
    isrecurrence: boolean;
    isedit:boolean;
    taskList: NewTask[];
    counselorid: number[];

    constructor() {

    }

}