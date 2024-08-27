import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-manageproduct',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatSlideToggleModule,
    CommonModule,
  ],
  templateUrl: './manageproduct.component.html',
  styleUrl: './manageproduct.component.scss',
})
export class ManageproductComponent implements OnInit {
  inputValue = '';
  productData = new MatTableDataSource<any>();
  // productData: any = [];
  // dataSource = this.productData;
  isHolding = false;
  holdTimeout: any;
  displayedColumns: string[] = [
    'categoryID',
    'description',
    'name',
    'price',
    'createdAt',
    'status',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
    this.productData.filterPredicate = (data: any, filter: string): boolean => {
      const transformedFilter = filter.trim().toLowerCase();

      const transformedPrice = data.price
        .toString()
        .replace(',', '.')
        .toLowerCase();

      return (
        data.description.toLowerCase().includes(transformedFilter) ||
        data.name.toLowerCase().includes(transformedFilter) ||
        transformedPrice.includes(transformedFilter)
      );
    };
  }

  loadAllProducts() {
    this.dashboardService.viewProduct().subscribe((products: any) => {
      this.productData.data = products;
    });
  }

  openAddProduct() {
    const dialogRef = this.dialog.open(AddproductComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  changeProductStatus(productData: any) {
    productData.status = !productData.status;
    this.saveChangeProductStatus(productData);
  }
  saveChangeProductStatus(productData: boolean) {
    this.dashboardService
      .changeProductStatus(productData)
      .pipe(
        tap((data: any) => {
          if (data) {
            this.snackbarService.openSnackbar('Product changed', '');
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

  editCategoryStatus(product: any) {
    const dialogRef = this.dialog.open(EditproductComponent, {
      data: {
        product,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAllProducts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.productData.filter = filterValue;
    if (this.productData.paginator) {
      this.productData.paginator.firstPage();
    }
  }

  clearFilter() {
    this.inputValue = '';
    this.productData.filter = '';
    if (this.productData.paginator) {
      this.productData.paginator.firstPage();
    }
  }

  onMouseDown(event: MouseEvent, element: any) {
    element.isHolding = true; // Set the holding state for this specific element
    element.holdTimeout = setTimeout(() => {
      this.deleteProduct(element); // Pass the element to the deleteProduct function
    }, 1000);
  }

  onMouseUp(element: any) {
    this.clearHold(element); // Clear hold for the specific element
  }

  onMouseLeave(element: any) {
    this.clearHold(element); // Clear hold for the specific element if the mouse leaves
  }

  clearHold(element: any) {
    clearTimeout(element.holdTimeout); // Clear the timeout for this specific element
    element.isHolding = false; // Reset the holding state for this specific element
  }

  deleteProduct(element: any) {
    console.log('Button held for more than 1 second');
    this.isHolding = false;
  }
}
