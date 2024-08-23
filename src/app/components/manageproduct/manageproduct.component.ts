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
  ],
  templateUrl: './manageproduct.component.html',
  styleUrl: './manageproduct.component.scss',
})
export class ManageproductComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}
  inputValue = '';
  productData: any = [];
  dataSource = this.productData;

  displayedColumns: string[] = [
    '_id',
    'categoryID',
    'description',
    'name',
    'price',
    // 'status',
    'createdAt',
    'status'
  ];

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.dashboardService.viewProduct().subscribe((products: any) => {
      console.log(products);

      this.productData = products;
    });
  }

  openAddProduct() {
    const dialogRef = this.dialog.open(AddproductComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeCategoryStatus() {}
}
