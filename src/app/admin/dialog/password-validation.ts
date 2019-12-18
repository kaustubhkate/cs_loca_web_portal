import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('userPwd').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPwd').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('confirmPwd').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
} 