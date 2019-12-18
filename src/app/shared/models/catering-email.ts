import { EmailList } from "./email-list";

export class CateringEmail{
    public subject:string;
    public sendToEmails:EmailList[];
    public ccEmails:EmailList[];
    public editorHtml:string;
    constructor(){

    }
}