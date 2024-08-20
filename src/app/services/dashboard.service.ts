import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpclient: HttpClient) {}
  apiUrl = enviroment.apiUrl;

  loadDashboard() {
    return this.httpclient.get(this.apiUrl + '/dashboard/getDetails');
  }

  token: any = localStorage.getItem('token');
  viewCategory() {
    return this.httpclient.put(this.apiUrl + '/category/getCategory', {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
