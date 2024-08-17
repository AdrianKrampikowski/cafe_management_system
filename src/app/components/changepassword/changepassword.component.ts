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
  constructor(public fb: FormBuilder) {}
  passwordForm = this.fb.group(
    {
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: confirmPasswordValidator() }
  );

  savePassword() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
    } else {
      console.log('invalid');
    }
  }
}
