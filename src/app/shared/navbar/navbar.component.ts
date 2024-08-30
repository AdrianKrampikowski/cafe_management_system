import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from '../../auth/signup/signup.component';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../auth/login/login.component';
import { LogindialogComponent } from '../../auth/logindialog/logindialog.component';
import { ForgotpasswordComponent } from '../../auth/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from '../../components/changepassword/changepassword.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.authService.userLogined = true;
    }
  }

  login() {
    const dialogRef = this.dialog.open(LogindialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  signup() {
    const dialogRef = this.dialog.open(SignupComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgotpasswordComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  changePasswordDialog() {
    const dialogRef = this.dialog.open(ChangepasswordComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }
}
