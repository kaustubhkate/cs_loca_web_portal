import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {

  let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null;
    }
    return emailRegExp.test(c.value) ? null : { 'email': true };
  };
}

@Directive({
  selector: '[appEmailValidator]'
})
export class EmailValidatorDirective {

  emailRegExp:RegExp;

  constructor(){
    this.emailRegExp =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value === null || c.value.length === 0) {
      return null;
    }
    return this.emailRegExp.test(c.value) ? null : { 'email': true };
  }
}
