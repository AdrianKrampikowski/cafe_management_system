import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { enviroment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpclient: HttpClient,
    private authService: AuthService
  ) {}

  apiUrl = enviroment.apiUrl;

  loadProductByCategory(data: any) {
    return this.httpclient.post(
      this.apiUrl + '/product/getProductByCategory',
      data,
      this.authService.getHeaders()
    );
  }

  createBill(data: any) {
    return this.httpclient.post(
      this.apiUrl + '/bill/createBill',
      data,
      this.authService.getHeaders()
    );
  }

  getpdfBill(data: any) {
    const headers = this.authService.getHeaders();
    return this.httpclient.post(this.apiUrl + '/bill/getpdf', data, {
      ...headers,
      responseType: 'blob', // Ensure responseType is set correctly
    });
  }
}
