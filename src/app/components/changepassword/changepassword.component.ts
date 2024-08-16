import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      username: [''], // Hidden username field for accessibility
      oldPassword: ['', Validators.required],
      newPasswordOne: ['', Validators.required],
      newPasswordTwo: ['', Validators.required],
    });

    // Apply the custom validator to the newPasswordTwo field
    this.passwordForm
      .get('newPasswordTwo')
      ?.setValidators(this.passwordsMatchValidator.bind(this));
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPasswordOne = this.passwordForm.get('newPasswordOne')?.value;
    const newPasswordTwo = control.value;

    if (newPasswordOne && newPasswordTwo && newPasswordOne !== newPasswordTwo) {
      return { passwordsMismatch: true };
    } else {
      return null;
    }
  }
}
