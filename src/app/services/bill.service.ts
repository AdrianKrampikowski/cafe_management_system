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

  loadBills() {
    return this.httpclient.get(
      this.apiUrl + '/bill/getBills',
      this.authService.getHeaders()
    );
  }

  deleteBill(id: any) {
console.log(id);

    return this.httpclient.delete(
      this.apiUrl + '/bill/deleteBill/' + id,
      this.authService.getHeaders()
    );
  }
}
