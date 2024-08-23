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
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { SnackbarService } from '../../services/snackbar.service';

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
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}
  value = '';
  productData: any = [];
  displayedColumns: string[] = ['sr', 'name', 'status', 'action'];

  ngOnInit(): void {
    this.loadAllCategorys();
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddcategoryComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.loadAllCategorys();
    });
  }

  loadAllCategorys() {
    this.dashboardService.viewCategory().subscribe((data: any) => {
      if (data) {
        this.productData = data;
      }
    });
  }

  editCategory(categoryData: any) {
    const dialogRef = this.dialog.open(EditcategoryComponent, {
      data: categoryData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAllCategorys();
    });
  }

  deleteCategory(categoryId: any) {
    this.dashboardService
      .deleteCategory(categoryId)
      .subscribe((result: any) => {
        if (result) {
          this.snackbarService.openSnackbar(result.message, '');
          this.loadAllCategorys();
        }
      });
  }
}
