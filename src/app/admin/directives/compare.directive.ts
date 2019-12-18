import { Directive,Input } from '@angular/core';
import { Validator,NG_VALIDATORS,AbstractControl,ValidationErrors,ValidatorFn, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
/**
 * Generated class for the CompairDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */

export function CompairValidator(controlNameToCampare:string):ValidatorFn{

  return(c: AbstractControl): ValidationErrors | null =>{
    if(c.value === null || c.value.length === 0){
    return null;
  }
  const controlToCompare = c.root.get(controlNameToCampare);
  if(controlToCompare){
    const  subscription:Subscription=controlToCompare.valueChanges.subscribe(()=>{
      c.updateValueAndValidity();
      subscription.unsubscribe();
     } );
    }
     return controlToCompare && controlToCompare.value !== c.value ?{'compare':true}:null;
  };
}

@Directive({
  selector: '[compare]' ,
  providers:[{provide:NG_VALIDATORS, useExisting:CompairDirective, multi:true}]// Attribute selector
})
export class CompairDirective implements Validator {
 
  @Input('compare') controlNameToCompare:string;

  validate(c: AbstractControl): ValidationErrors | null {
    if(c.value === null || c.value.length === 0){
    return null;
  }
  
  const controlToCompare = c.root.get(this.controlNameToCompare);
  if(controlToCompare){
    const  subscription: Subscription = controlToCompare.valueChanges.subscribe(()=>{
      c.updateValueAndValidity();
      subscription.unsubscribe();
     } );
    }
     return controlToCompare && controlToCompare.value !== c.value ?{'compare':true}:null;
  };
}

