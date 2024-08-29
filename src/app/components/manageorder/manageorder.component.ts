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

  categoryData: any;
  productData: any;

  ngOnInit(): void {
    this.loadCategorys();
  }

  loadCategorys() {
    this.dashboardService.viewCategory().subscribe((data: any) => {
      this.categoryData = data;
    });
  }

  loadProducts(value: any) {
    const categoryID = { categoryID: value.value._id };
    this.orderService
      .loadProductByCategory(categoryID)
      .subscribe((data: any) => {
        this.productData = data;
      });

    this.customerForm.patchValue({
      price: '',
      quantity: '',
      total: '',
    });
    // this.dashboardService.viewProduct().subscribe((data: any) => {
    //   this.productData = data.filter((product: any) => {
    //     return product.categoryID.includes(value.value._id);
    //   });
    // });
  }

  loadProductPriceQuantity(event: any) {
    this.customerForm.patchValue({
      price: event.value.price,
      quantity: '1',
    });
    this.calculateTotal();
  }

  changeQuantity(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedQuantity = inputElement.value.replace(/[^0-9]/g, '');
  
    // Only allow numeric values, update the input value to the sanitized quantity
    if (inputElement.value !== sanitizedQuantity) {
      inputElement.value = sanitizedQuantity;
      this.customerForm.patchValue({ quantity: sanitizedQuantity });
    }
  
    // Recalculate the total if the input is valid
    if (sanitizedQuantity) {
      this.calculateTotal();
    }
  }
  // changeQuantity(event: any) {
  //   let quantity = this.customerForm.get('quantity')?.value;
  //   console.log('quantity', quantity);

  //   const inputElement = event.target as HTMLInputElement;
  //   // this.customerForm.patchValue({
  //   //   quantity: inputElement.value,
  //   // });
  //   let checkRegex = /[0-9]+/.test(inputElement.value);
  //   let charCode = event.keyCode;
  //   // console.log(charCode);
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   } else {
  //     console.log('else');
  //     this.calculateTotal();
  //     return true;
  //   }
  // }
  // ^[0-9]*$
  calculateTotal() {
    // debugger;
    let price = this.customerForm.get('price')?.value;
    let quantity = this.customerForm.get('quantity')?.value;
    let total = String((Number(price) * Number(quantity)).toFixed(2));
    this.customerForm.patchValue({
      total: total,
    });
  }
}
