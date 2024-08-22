import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private httpclient: HttpClient,
    private authService: AuthService
  ) {}
  apiUrl = enviroment.apiUrl;

  loadDashboard() {
    return this.httpclient.get(this.apiUrl + '/dashboard/getDetails');
  }

  addCategory(data: any) {
    return this.httpclient.post(
      this.apiUrl + '/category/createCategory',
      data,
      {
        headers: this.authService.setHeader(),
      }
    );
  }

  viewCategory() {
    return this.httpclient.get(this.apiUrl + '/category/getCategory', {
      headers: this.authService.setHeader(),
    });
  }

  updateCategory(categoryData: any) {
    return this.httpclient.patch(
      this.apiUrl + '/category/updateCategory',
      categoryData,
      {
        headers: this.authService.setHeader(),
      }
    );
  }

  deleteCategory(categoryID: any) {
    return this.httpclient.delete(
      this.apiUrl + '/category/deleteCategory/' + categoryID,
      {
        headers: this.authService.setHeader(),
      }
    );
  }

  viewProduct() {
    return this.httpclient.get(this.apiUrl + '/product/getAllProducts', {
      headers: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });
  }
}