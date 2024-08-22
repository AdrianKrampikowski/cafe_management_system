import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManagecategoryComponent } from '../managecategory/managecategory.component';
// import { NgClass } from '@angular/common';
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
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

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
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.scss',
})
export class EditcategoryComponent implements OnInit {
  categoryData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<any>
  ) {}

  categoryForm = this.fb.group({
    _id: ['', Validators.required],
    name: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    this.categoryData = this.data;
    this.categoryForm.patchValue({
      _id: this.categoryData._id,
      name: this.categoryData.name,
      status: this.categoryData.status,
    });
  }

  changeCategoryStatus() {
    this.categoryData.status = !this.categoryData.status;
  }

  updateCategory() {
    this.dashboardService
      .updateCategory(this.categoryForm.value)
      .pipe(
        tap((data: any) => {
          if (data) {
            this.snackbarService.openSnackbar('Category changed', '');
            this.dialogRef.close();
          } else {
            this.snackbarService.openSnackbar(
              'Category change failed',
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
}
