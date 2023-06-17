import { AbstractControl, ValidatorFn } from "@angular/forms";

export function inputWhiteSpaceValidator() : ValidatorFn {
   return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.trim() === '') {
         return { 'whitespace': true };
      }
      return null;
   };
}