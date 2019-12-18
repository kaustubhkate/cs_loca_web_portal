import { AbstractControl } from '@angular/forms';

export class TwoTimeValidation {

    static DiffTime(AC: AbstractControl) {
        let starttime = AC.get('starttime').value;
        let endtime = AC.get('endtime').value;
        if (starttime != null && endtime != null && starttime != "" && endtime != "") {
            let start = starttime.split(':')[0];
            let end = endtime.split(':')[0];
            if (start > end) {
                AC.get('endtime').setErrors({ DiffTime: true });
            } else if (start == end) {
                let stMinute = starttime.split(':')[1];
                let enMinute = endtime.split(':')[1];
                if (stMinute > enMinute) {
                    AC.get('endtime').setErrors({ DiffTime: true });
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
} 
