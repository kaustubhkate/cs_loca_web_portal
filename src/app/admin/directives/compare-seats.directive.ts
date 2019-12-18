import { Directive,Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl,ValidationErrors,ValidatorFn} from "@angular/forms";
import { Subscription } from "rxjs";


export function CompairValueValidator(controlNameToCampare:string):ValidatorFn{

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
     return controlToCompare && parseInt(controlToCompare.value) < parseInt(c.value) ? {'comparevalue' : true } :null;
  };
}

@Directive({
  selector: '[appCompareSeats]',
  providers:[{provide:NG_VALIDATORS, useExisting: CompareSeatsDirective, multi:true,}]// Attribute selector
})
export class CompareSeatsDirective {

  @Input('compare') controlNameToCompare:string;

  validate(c: AbstractControl): ValidationErrors | null {
    if(c.value === null || c.value.length === 0){
    return null;
  }
  const controlToCompare = c.root.get(this.controlNameToCompare);
  if(controlToCompare){
    const  subscription:Subscription=controlToCompare.valueChanges.subscribe(()=>{
      c.updateValueAndValidity();
      subscription.unsubscribe();
     } );
    }
     return controlToCompare && controlToCompare.value !== c.value ?{'comparevalue':true}:null;
  };

}
