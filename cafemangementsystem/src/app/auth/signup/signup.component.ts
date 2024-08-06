import { Component, Inject } from '@angular/core';
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
    public dialogRef: MatDialogRef<SignupComponent>, // @Inject(MAT_DIALOG_DATA) public data: DialogData
    public fb: FormBuilder
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
    console.log('userForm', this.userForm.value);
  }
}
