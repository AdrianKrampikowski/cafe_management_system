import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';
import { AuthService } from './auth.service';
import { OwncookieService } from './owncookie.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private httpclient: HttpClient,
    private authService: AuthService,
    private ownCookieService: OwncookieService,
    private cookieService: CookieService
  ) {
    this.encodedToken = this.decodedToken(this.encodedToken);
  }

  apiUrl = enviroment.apiUrl;
  encodedToken = this.cookieService.get('encodedToken');

  private decodedToken(encodedToken: string) {
    return atob(encodedToken);
  }

  loadDashboard() {
    return this.httpclient.get(this.apiUrl + '/dashboard/getDetails');
  }

  addCategory(data: any) {
    return this.httpclient.post(
      this.apiUrl + '/category/createCategory',
      data,
      {
        headers: { Authorization: `Bearer ${this.encodedToken}` },
      }
    );
  }

  viewCategory() {
    return this.httpclient.get(this.apiUrl + '/category/getCategory', {
      // headers: this.authService.setHeader(),
      headers: { Authorization: `Bearer ${this.encodedToken}` },
    });
  }

  updateCategory(categoryData: any) {
    return this.httpclient.patch(
      this.apiUrl + '/category/updateCategory',
      categoryData,
      {
        headers: { Authorization: `Bearer ${this.encodedToken}` },
      }
    );
  }

  deleteCategory(categoryID: any) {
    return this.httpclient.delete(
      this.apiUrl + '/category/deleteCategory/' + categoryID,
      {
        headers: { Authorization: `Bearer ${this.encodedToken}` },
      }
    );
  }

  addProduct(data: any) {
    console.log('data', data);

    return this.httpclient.post(this.apiUrl + '/product/createProduct', data, {
      headers: { Authorization: `Bearer ${this.encodedToken}` },
    });
  }

  viewProduct() {
    return this.httpclient.get(this.apiUrl + '/product/getAllProducts', {
      headers: {
        Authorization: `Bearer ${this.encodedToken}`,
      },
    });
  }

  updateProduct(categoryData: any) {
    return this.httpclient.patch(
      this.apiUrl + '/product/updateProduct/' + categoryData._id,
      categoryData,
      {
        headers: { Authorization: `Bearer ${this.encodedToken}` },
      }
    );
  }
  changeProductStatus(productData: any) {
    return this.httpclient.patch(
      this.apiUrl + '/product/updateProductStatus/' + productData._id,
      productData,
      {
        headers: { Authorization: `Bearer ${this.encodedToken}` },
      }
    );
  }

  deleteProduct(productData: any) {
    return this.httpclient.patch(
      this.apiUrl + '/product/updateProductStatus/' + productData._id,
      productData,
      {
        headers: { Authorization: `Bearer ${this.encodedToken}` },
      }
    );
  }
}
