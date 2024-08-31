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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';
// import { MatSelectChange } from '@angular/material/select';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SnackbarService } from '../../services/snackbar.service';
import { of } from 'rxjs';
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
    MatAutocompleteModule,
  ],
  templateUrl: './manageorder.component.html',
  styleUrl: './manageorder.component.scss',
})
export class ManageorderComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private dashboardService: DashboardService,
    private orderService: OrderService,
    private userService: UserService,
    private snackbarService: SnackbarService
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

  userData: any;
  categoryData: any;
  productData: any;
  filteredUserData: any[] = [];
  listData: any = new MatTableDataSource<any>();
  totalPrice: number = 0;

  ngOnInit(): void {
    this.loadUser();
    this.loadCategorys();

    this.setupFormListeners();
  }

  loadUser() {
    this.userService.loadAllUser().subscribe((data: any) => {
      this.userData = data;
    });
  }

  setupFormListeners() {
    this.customerForm
      .get('name')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.filterUsers());

    this.customerForm
      .get('email')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.filterUsers());

    this.customerForm
      .get('contactNumber')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.filterUsers());
  }

  filterUsers() {
    const name = this.customerForm.get('name')?.value;
    const email = this.customerForm.get('email')?.value;
    const contactNumber = this.customerForm.get('contactNumber')?.value;

    this.filteredUserData = this.userData.filter(
      (user: any) =>
        (!name || user.name.toLowerCase().includes(name.toLowerCase())) &&
        (!email || user.email.toLowerCase().includes(email.toLowerCase())) &&
        (!contactNumber || user.contactNumber.includes(contactNumber))
    );
  }

  onUserSelected(selectedValue: string) {
    const selectedUser = this.userData.find(
      (user: any) =>
        user.name === selectedValue ||
        user.email === selectedValue ||
        user.contactNumber === selectedValue
    );

    if (selectedUser) {
      this.customerForm.patchValue({
        name: selectedUser.name,
        email: selectedUser.email,
        contactNumber: selectedUser.contactNumber,
      });
    }
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

  calculateTotal() {
    let price = this.customerForm.get('price')?.value;
    let quantity = this.customerForm.get('quantity')?.value;
    let total = String((Number(price) * Number(quantity)).toFixed(2));
    this.customerForm.patchValue({
      total: total,
    });
  }

  addProductToList() {
    let data: any = this.customerForm.value;
    const newObject = {
      productName: data.product?.name,
      category: data.category?.name,
      price: data.product?.price,
      quantity: data?.quantity,
      subTotal: data?.total,
    };
    this.listData.data = [...this.listData.data, newObject];
  }

  deleteListElement(index: any) {
    this.listData.data.splice(index, 1);
    this.listData.data = [...this.listData.data];
  }

  //   {
  //     "name": "John Doe2",
  //     "uuid": "123e4567-e89b-12d3-a456-426614174000",
  //     "email": "johndoe@example.com",
  //     "contactNumber": "1234567890",
  //     "paymentMethod": "Credit Card",
  //     "total": 100.50,
  //     "productDetails": [
  //         {
  //             "productName": "Sample Product",
  //             "category": "food",
  //             "quantity": 2,
  //             "price": 50.25,
  //             "subTotal": 1000
  //         }
  //     ]
  // }

  async submitBill() {
    this.listData.data.map((item: any) => {
      this.totalPrice += Number(item.subTotal);
    });
    const formData = this.customerForm.value;
    const billData: any = {
      name: formData?.name,
      email: formData?.email,
      contactNumber: formData?.contactNumber,
      paymentMethod: formData?.paymentMethod,
      total: this.totalPrice.toFixed(2),
      productDetails: this.listData.data,
    };
    this.orderService
      .createBill(billData)
      .pipe(
        tap((data: any) => {
          if (data) {
            this.snackbarService.openSnackbar('Bill created', '');
            billData.uuid = data.uuid;
            this.getpdf(billData);
            this.listData.data = [];
            this.totalPrice = 0;
            this.customerForm.reset();
          } else {
            this.snackbarService.openSnackbar('Bill created', 'error');
          }
        }),
        catchError((error: any) => {
          this.snackbarService.openSnackbar(error.message, 'error');
          return of(null);
        })
      )
      .subscribe();
  }

  getpdf(data: any) {
    this.orderService
      .getpdfBill(data)
      .pipe(
        catchError((err: any) => {
          this.snackbarService.openSnackbar(err.message, 'error');
          return of(null); // Return null in case of error
        })
      )
      .subscribe(
        (blob: Blob | null) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${data.uuid}.pdf`; // Assuming `data` contains the `uuid`
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          } else {
            console.error('Failed to download PDF: No blob data received');
          }
        },
        (error) => {
          console.error('Error downloading the PDF', error);
        }
      );
  }
}
