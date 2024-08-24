import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss',
})
export class EditproductComponent implements OnInit {
  productForm = this.fb.group({
    _id: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public productData: any,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    this.productForm.patchValue({
      _id: this.productData.product._id,
      name: this.productData.product.name,
      price: this.productData.product.price,
      description: this.productData.product.description,
      status: this.productData.product.status,
    });
  }

  changeProductStatus() {
    let statusControl = this.productForm.get('status')?.value;
    if (statusControl) {
      statusControl.setValue(!statusControl.value);
    }
  }

  cancel() {}

  updateProduct() {
    this.dashboardService
      .updateProduct(this.productForm.value)
      .pipe(
        tap((data: any) => {
          if (data) {
            this.snackbarService.openSnackbar('Product changed', '');
            this.dialogRef.close();
          } else {
            this.snackbarService.openSnackbar('Product change failed', 'error');
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
