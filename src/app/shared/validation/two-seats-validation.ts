import {AbstractControl} from '@angular/forms';
export class TwoSeatsValidation {

    static SeatDiff(AC: AbstractControl) {

       let total = AC.get('totalseats').value;
       let minimum = AC.get('minseats').value; 

       let amount = total != "" ? parseInt(total) : 0;
       let minSeats = minimum != "" ? parseInt(minimum) : 0;

       console.log("amount", amount);
       console.log("minSeats", minSeats);

        if(amount > 0 && minSeats > 0) {
            if(amount < minSeats){
                AC.get('minseats').setErrors({SeatDiff: true});
            }else{
                return null;
            }
        } else {
            return null;
        }
    }
} 