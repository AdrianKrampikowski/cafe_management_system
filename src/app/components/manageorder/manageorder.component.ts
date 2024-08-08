import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manageorder',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './manageorder.component.html',
  styleUrl: './manageorder.component.scss',
})
export class ManageorderComponent {
  constructor(public fb: FormBuilder) {}

  customerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    total: ['', Validators.required],
  });

  displayedColumns: string[] = [
    'Name',
    'Category',
    'Price',
    'Quantity',
    'Total',
    'Delete',
  ];

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
}
