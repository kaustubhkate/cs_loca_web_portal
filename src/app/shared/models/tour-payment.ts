export class TourPayment{
    id: number;
    candidateid: number;
    tourid: number;
    receiptno: string;
    totalamt: number;
    receivedamt: number;
    balancedue: number;
    paymentmode: string;
    transactionid: string;
    addedby: number;
    addeddate: Date;

    constructor(){

    }
}