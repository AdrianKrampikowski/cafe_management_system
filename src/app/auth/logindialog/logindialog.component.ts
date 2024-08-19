import { Component, EventEmitter, Output } from '@angular/core';
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
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-logindialog',
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
  templateUrl: './logindialog.component.html',
  styleUrl: './logindialog.component.scss',
})
export class LogindialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    public fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private snackBarService: SnackbarService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        tap((data: any) => {
          if (data) {
            this.authService.userLogined = true;
            localStorage.setItem('token', data.token);
            this.snackBarService.openSnackbar('SignUp Successful', '');
            this.router.navigate(['/dashboard']);
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
}
