import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    public fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackbarService
  ) {}

  userForm = this.fb.group({
    name: [``, Validators.required],
    age: [null, [Validators.required, Validators.min(18)]],
    email: [``, [Validators.required, Validators.email]],
    contactNumber: [``, Validators.required],
    password: [``, Validators.required],
    // status: [false, Validators.required],
    // role: [``, Validators.required],
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  signUp() {
    this.authService
      .signUp(this.userForm.value)
      .pipe(
        tap((data: any) => {
          if (data) {
            this.snackBarService.openSnackbar('SignUp Successful', '');
          } else {
            this.snackBarService.openSnackbar(data.message, 'error');
          }
        }),
        catchError((error: any) => {
          this.snackBarService.openSnackbar(error.message, 'error');
          return of(null);
        })
      )
      .subscribe();
  }
  // signUp() {
  //   this.authService.signUp(this.userForm.value).subscribe(
  //     (data: any) => {
  //       if (data) {
  //         this.snackBarService.openSnackbar('SignUp Successful', '');
  //       } else {
  //         this.snackBarService.openSnackbar(data.message, 'error');
  //       }
  //     },
  //     (Error: any) => {
  //       this.snackBarService.openSnackbar(Error.message, 'error');
  //     }
  //   );
  // }
}
