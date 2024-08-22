import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
@Component({
  selector: 'app-managecategory',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './managecategory.component.html',
  styleUrl: './managecategory.component.scss',
})
export class ManagecategoryComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}
  value = '';
  productData: any = [];
  displayedColumns: string[] = [
    'sr',
    'name',
    'description',
    'price',
    'status',
    'action',
  ];

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.dashboardService.viewProduct().subscribe((data: any) => {
      if (data) {
        this.productData = data;
        console.log(this.productData);
      }
    });
  }

  editCategory(categoryData: any) {
    this.dialog.open(EditcategoryComponent, {
      data: categoryData,
    });
  }
}
