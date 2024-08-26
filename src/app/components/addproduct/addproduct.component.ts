import { Component, OnInit } from '@angular/core';
import {
  // FormControl,
  // FormGroupDirective,
  // NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss',
})
export class AddproductComponent implements OnInit {
  categoryList: any[] = [];
  addProductForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    public fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.dashboardService.viewCategory().subscribe((result: any) => {
      this.categoryList = result;
      // this.categoryList = result.map((category: any) => category.name);
    });
  }

  addProduct() {
    if (this.addProductForm.value.category) {
      this.addProductForm.value.category =
        this.addProductForm.value.category[0];
      let formValue = this.addProductForm.value;
      if (formValue.price) {
        formValue.price = formValue.price?.replace(',', '.');
      }
      console.log('this.addProductForm.value', this.addProductForm.value);
      this.dashboardService
        .addProduct(this.addProductForm.value)
        .pipe(
          tap((data: any) => {
            if (data) {
              this.snackbarService.openSnackbar('Product added', '');
            } else {
              this.snackbarService.openSnackbar('Product add failed', 'error');
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
}
