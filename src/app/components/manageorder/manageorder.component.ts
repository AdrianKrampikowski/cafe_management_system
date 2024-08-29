import { Component, OnInit } from '@angular/core';
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
import { DashboardService } from '../../services/dashboard.service';
// import { MatSelectChange } from '@angular/material/select';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
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
    CommonModule,
  ],
  templateUrl: './manageorder.component.html',
  styleUrl: './manageorder.component.scss',
})
export class ManageorderComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private dashboardService: DashboardService,
    public orderService: OrderService
  ) {}

  customerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    //
    category: ['', Validators.required],
    product: ['', Validators.required],
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

  ngOnInit(): void {
    this.loadCategorys();
  }

  categoryData: any;
  loadCategorys() {
    this.dashboardService.viewCategory().subscribe((data: any) => {
      this.categoryData = data;
    });
  }

  productData: any;
  loadProducts(value: any) {
    const categoryID = { categoryID: value.value._id };
    this.orderService
      .loadProductByCategory(categoryID)
      .subscribe((data: any) => {
        this.productData = data;
      });
    this.customerForm.get('price')?.setValue('');
    this.customerForm.get('quantity')?.setValue('');
    // this.dashboardService.viewProduct().subscribe((data: any) => {
    //   this.productData = data.filter((product: any) => {
    //     return product.categoryID.includes(value.value._id);
    //   });
    // });
  }

  loadProductPriceQuantity(event: any) {
    this.customerForm.get('price')?.setValue(event.value.price);
    this.customerForm.get('quantity')?.setValue('1');
  }

  changeQuantity(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.customerForm.get('quantity')?.setValue(inputElement.value);
    console.log('customerForm', this.customerForm.value.quantity);
  }
}
