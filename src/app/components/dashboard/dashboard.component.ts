import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../../services/dashboard.service';
import { response } from 'express';
import { ViewcategoryComponent } from '../viewcategory/viewcategory.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  categoryData: any;

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDashboardCounts();
  }

  loadDashboardCounts() {
    this.dashboardService.loadDashboard().subscribe({
      next: (response: any) => {
        this.dashboardData = response;
      },
      error: (error: any) => {
        console.error('Error loading dashboard:', error);
      },
      // complete: () => {
      //   console.log('Dashboard loading complete');
      // },
    });
  }

  viewCategory() {
    this.dashboardService.viewCategory().subscribe({
      next: (response: any) => {
        console.log('response', response);
        this.dialog.open(ViewcategoryComponent, {
          data: response,
        });
      },
      error: (error: any) => {
        console.error('Error loading dashboard:', error);
      },
    });
  }
}
