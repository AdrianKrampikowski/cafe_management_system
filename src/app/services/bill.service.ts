import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  apiUrl = enviroment.apiUrl;
  constructor(
    private httpclient: HttpClient,
    private authService: AuthService
  ) {}

  loadBills(page?: any, limit?: any) {
    return this.httpclient.get(
      this.apiUrl + '/bill/getBills' + '?page=' + page + '&limit=' + limit,
      this.authService.getHeaders()
    );
  }

  getpdf(data: any) {
    const headers = this.authService.getHeaders();
    return this.httpclient.post(this.apiUrl + '/bill/getpdf', data, {
      ...headers,
      responseType: 'blob', // Ensure responseType is set correctly
    });
  }

  deleteBill(id: any) {
    return this.httpclient.delete(
      this.apiUrl + '/bill/deleteBill/' + id,
      this.authService.getHeaders()
    );
  }
}
