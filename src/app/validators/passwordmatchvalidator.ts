import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// export function confirmPasswordValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');
//     if (
//       password &&
//       confirmPassword &&
//       password.value !== confirmPassword.value
//     ) {
//       return { passwordNotMatching: true };
//     } else {
//       return null;
//     }
//   };
// }

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordNotMatching: true });
      return { passwordNotMatching: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  };
}
