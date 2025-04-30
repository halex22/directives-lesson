import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function IsValidDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const userDate = new Date(control.value)
    const today = new Date()
    today.setHours(0,0,0,0)

    if (userDate > today) return {invalidDate: true}
    
    return null
  };
}