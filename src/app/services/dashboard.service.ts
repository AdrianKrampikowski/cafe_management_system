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

  viewCategory() {
    return this.httpclient.get(this.apiUrl + '/category/getCategory', {
      headers: this.authService.setHeader(),
    });
  }
}
