import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.scss',
})
export class ViewproductComponent {
  productData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dashboardProductData: DashboardComponent
  ) {}

  ngOnInit(): void {
    this.productData = this.dashboardProductData;
  }
}
