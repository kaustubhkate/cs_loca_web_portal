import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn, FormGroup } from '@angular/forms';
// import { CatererProfileService } from '../services/caterer-profile.service';

export const usernameRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('emailid');

  return name && name.value === 'pravin.tumsare@mjbtech.com'? { 'identityRevealed': true } : null;
};

@Directive({
  selector: '[appUsernameValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true }]
})
export class UsernameValidatorDirective {

  constructor(
    // private profileService:CatererProfileService
    ) { }

  validate(control: AbstractControl): ValidationErrors {
    return usernameRevealedValidator(control)
  }

}
