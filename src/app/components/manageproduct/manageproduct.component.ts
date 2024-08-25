import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { ChangeDetectorRef } from '@angular/core';
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
  productData: any = [];
  dataSource = this.productData;
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
    private cdr: ChangeDetectorRef,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.dashboardService.viewProduct().subscribe((products: any) => {
      this.productData = products;
    });
  }

  openAddProduct() {
    const dialogRef = this.dialog.open(AddproductComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  changeProductStatus(productData: any) {
    productData.status = !productData.status;
    // this.cdr.detectChanges();
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

  onMouseDown(event: MouseEvent) {
    this.isHolding = true;
    this.holdTimeout = setTimeout(() => {
      this.deleteCategoryStatus();
    }, 1000);
  }

  onMouseUp() {
    this.clearHold();
  }
  onMouseLeave() {
    this.clearHold();
  }
  clearHold() {
    clearTimeout(this.holdTimeout);
    this.isHolding = false;
  }
  deleteCategoryStatus() {
    console.log('Button held for more than 1 second');
    this.isHolding = false;
  }
}
