import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletecategorydialogComponent } from '../deletecategorydialog/deletecategorydialog.component';

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
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './managecategory.component.html',
  styleUrl: './managecategory.component.scss',
})
export class ManagecategoryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}
  ngAfterViewInit() {
    this.productData.paginator = this.paginator;
  }
  value = '';
  datalength: any;
  productData = new MatTableDataSource<any>(); // Initialize as MatTableDataSource
  displayedColumns: string[] = ['sr', 'name', 'status', 'action'];

  ngOnInit(): void {
    this.loadAllCategorys();
    // this.productData.filterPredicate = (data: any, filter: string): boolean => {
    //   return data.name.toLowerCase().includes(filter);
    // };
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
        this.productData.data = data;
        this.datalength = data.length;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    // .toLowerCase();
    this.dashboardService
      .viewFilteredCategory(filterValue)
      .subscribe((result: any) => {
        this.productData.data = result;
        this.datalength = result.length;
      });

    // this.productData.filter = filterValue;
    // if (this.productData.paginator) {
    //   this.productData.paginator.firstPage();
    // }
  }

  clearFilter() {
    this.value = '';
    this.productData.filter = '';
    if (this.productData.paginator) {
      this.productData.paginator.firstPage();
    }
  }

  openDeleteCategoryDialog(id: any) {
    const dialogRef = this.dialog.open(DeletecategorydialogComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != 'false') {
        this.snackbarService.openSnackbar(result.message, '');
        this.loadAllCategorys();
      } else {
        this.snackbarService.openSnackbar('deleting canceled', '');
      }
    });
  }
}
