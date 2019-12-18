import { Directive,Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl,ValidationErrors,ValidatorFn} from "@angular/forms";
import { Subscription } from "rxjs";

export function CompairQuantityValidator(controlNameToCampare:string):ValidatorFn{

  return(c: AbstractControl): ValidationErrors | null =>{
    if(c.value === null || c.value.length === 0){
    return null;
  }
  console.log("controlNameToCampare=", controlNameToCampare);
  console.log("c.value=", c.value);
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
  selector: '[appCompareQuantity]',
  providers:[{provide:NG_VALIDATORS, useExisting: CompareQuantityDirective, multi:true,}]// Attribute selector
})
export class CompareQuantityDirective {

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
