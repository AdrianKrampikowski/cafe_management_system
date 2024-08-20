import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = enviroment.apiUrl;
  token: any = this.authService.token;
  constructor(
    private httpclient: HttpClient,
    private authService: AuthService
  ) {}

  setHeader() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return headers;
  }

  loadAllUser() {
    return this.httpclient.get(this.apiUrl + '/user/getAllUsers', {
      headers: this.setHeader(),
    });
  }

  changeUserStatus(status: boolean, id: string) {
    const data = { status: status, id: id };
    return this.httpclient
      .patch(this.apiUrl + '/user/updateUser', data, {
        headers: this.setHeader(),
      })
      .subscribe({
        next: (response) => {
          console.log('Success:', response);
        },
        error: (error) => {
          console.error('Request failed:', error);
        },
      });
  }
}
