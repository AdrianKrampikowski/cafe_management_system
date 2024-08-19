import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { confirmPasswordValidator } from '../../validators/passwordmatchvalidator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { catchError, of, tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss',
})
export class ChangepasswordComponent {
  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<any>
  ) {}
  passwordForm = this.fb.group(
    {
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: confirmPasswordValidator() }
  );

  savePassword() {
    this.authService
      .changeOwnPassword(this.passwordForm.value)
      .pipe(
        tap((data: any) => {
          if (data) {
            this.snackbarService.openSnackbar('Password changed', '');
            this.dialogRef.close();
          } else {
            this.snackbarService.openSnackbar(
              'Password change failed',
              'error'
            );
          }
        }),
        catchError((error: any) => {
          this.snackbarService.openSnackbar(error.message, 'error');
          return of(null);
        })
      )
      .subscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
