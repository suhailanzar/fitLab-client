import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom validator function
export function numericValidator(control: AbstractControl): ValidationErrors | null {
  const isValid = /^\d*$/.test(control.value); // Allows empty string and only numeric values
  return isValid? null : { 'notNumeric': { value: control.value } };
}