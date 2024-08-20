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

  loadAllUser() {
    // const headers = new HttpHeaders().set('Authorization', this.token);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.httpclient.get(this.apiUrl + '/user/getAllUsers', {
      headers: headers,
    });
  }

  // loadAllUser() {
  //   console.log('token', this.token);

  //   return this.httpclient.get(this.apiUrl + '/user/getAllUsers', {
  //     headers: {
  //       Authorization: this.token,
  //     },
  //   });
  // }

  // changeUserStatus(status: boolean) {
  //   const data = { status: status };

  //   return this.httpclient.patch(
  //     this.apiUrl + '/user/updateUser',
  //     data,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  // }
}
