import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Subscription } from "rxjs";


// export function CompairDateAndTimeValidator(enddate: string): ValidatorFn {
//   return (c: AbstractControl): ValidationErrors | null => {
//     if (c.value === null || c.value.length === 0) {
//       return null;
//     }
//     const stDate = c.root.get(c.value);
//     const enDate = c.root.get(enddate);

//     let startDateTime = new Date(c.value);
//     let endDateTime = new Date(enDate.value);
//     if (startDateTime && endDateTime) {
//       const subscription: Subscription = stDate.valueChanges.subscribe(() => {
//         c.updateValueAndValidity();
//         subscription.unsubscribe();
//       });
//     }
//     return startDateTime && startDateTime.getTime() >= endDateTime.getTime() ? { 'camparetime': true } : null;
//   };
// }

export function CompairDateAndTimeValidator2(startdate: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null;
    }
    const stDate = c.root.get(startdate);
    let startDateTime = new Date(stDate.value);
    let endDateTime = new Date(c.value);
    if (startDateTime) {
      const subscription: Subscription = stDate.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
  
    return startDateTime && startDateTime.getTime() >= endDateTime.getTime() ? { 'comparedate': true } : null;
  };
}

/**
 * Test comparing
 * @param startdate 
 * @param starttime 
 * @param enddate 
 * @param endtime 
 */
/* export function CompairEndDateTimeWithStartDate(startdate:string, starttime:string, enddate : string,endtime:string):ValidatorFn{

  return(c: AbstractControl): ValidationErrors | null => {
    if(c.value === null || c.value.length === 0){
    return null;
  }
  const stDate = c.root.get(startdate);
  const stTime = c.root.get(starttime);
  const enDate = c.root.get(enddate);
  const enTime = c.root.get(endtime);

  let startDateTime = new Date(stDate.value);
  let model = new Date(stTime.value);
  startDateTime.setHours(model.getHours(), model.getMinutes(), 0,0);
  let endDateTime = new Date(enDate.value);
  let model2 = new Date(c.value);
  console.log(model2); 
  endDateTime.setHours(model2.getHours(), model2.getMinutes(), 0,0);
  if(startDateTime && endDateTime){
    const  subscription: Subscription = stDate.valueChanges.subscribe(()=>{
      c.updateValueAndValidity();
      subscription.unsubscribe();
     });
    }
    return startDateTime && startDateTime.getTime() >= endDateTime.getTime() ? {'comparefirst':true}: null;
  };
}*/


export function CompairTimeValidator(controlNameToCampare: string): ValidatorFn {

  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null;
    }
    const controlToCompare = c.root.get(controlNameToCampare);
  
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    console.log("controlToCompare", controlToCompare.value)
    console.log("c value", c.value)
    return controlToCompare && controlToCompare.value >= c.value ? { 'comparetime': true } : null;
  };
}


@Directive({
  selector: '[appComapreTime]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ComapreTimeDirective, multi: true, }]// Attribute selector
})
export class ComapreTimeDirective {

  @Input('compare') controlNameToCompare: string;

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value === null || c.value.length === 0) {
      return null;
    }
    const controlToCompare = c.root.get(this.controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== c.value ? { 'comparetime': true } : null;
  };

}
