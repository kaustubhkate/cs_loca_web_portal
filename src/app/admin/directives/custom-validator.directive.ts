import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';


export function CustomValidator(controlNameToCampare:string): ValidatorFn{

  return(c: AbstractControl): ValidationErrors | null =>{
    if(c.value === null || c.value.length === 0){
    return null;
  }
  const controlToCompare = c.root.get(controlNameToCampare);
  console.log("starttime", controlNameToCampare);
  console.log("endtime", c.value);
  if(controlToCompare){
    const  subscription:Subscription=controlToCompare.valueChanges.subscribe(()=>{
      c.updateValueAndValidity();
      subscription.unsubscribe();
     });
    }
    return controlNameToCampare && controlNameToCampare >= c.value ? {'comparetime2':true}: null;
  };
}

@Directive({
  selector: '[appCustomValidator]'
})
export class CustomValidatorDirective {

  constructor() { }

}
