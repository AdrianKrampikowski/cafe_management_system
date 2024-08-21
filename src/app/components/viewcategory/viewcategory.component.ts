import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewcategory',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, CommonModule],
  templateUrl: './viewcategory.component.html',
  styleUrl: './viewcategory.component.scss',
})
export class ViewcategoryComponent implements OnInit {
  categoryData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dashboardCategoryData: DashboardComponent
  ) {}

  ngOnInit(): void {
    this.categoryData = this.dashboardCategoryData;
  }
}
