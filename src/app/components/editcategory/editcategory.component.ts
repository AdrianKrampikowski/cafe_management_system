import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagecategoryComponent } from '../managecategory/managecategory.component';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-editcategory',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.scss',
})
export class EditcategoryComponent implements OnInit {
  categoryData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryData = this.data;
    this.categoryForm.patchValue({
      name: this.categoryData.name,
      status: this.categoryData.status,
    });
  }

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
  });
}
