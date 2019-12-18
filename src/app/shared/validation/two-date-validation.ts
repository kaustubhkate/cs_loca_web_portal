import {AbstractControl} from '@angular/forms';
export class TwoDateValidation {

    static DiffDate(AC: AbstractControl) {
       let start = AC.get('startDate').value; // to get value in input tag
       let end = AC.get('endDate').value; // to get value in input tag
        if(start!=null && end!=null && start > end) {
            AC.get('endDate').setErrors( {DiffDate: true} )
        } else {
            return null;
        }
    }
} 