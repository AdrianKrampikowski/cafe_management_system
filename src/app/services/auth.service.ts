import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { enviroment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpclient: HttpClient) {}
  apiUrl = enviroment.apiUrl;
  userLogined: boolean = false;
  token: any = localStorage.getItem('token');

  signUp(data: any) {
    return this.httpclient.post(this.apiUrl + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  login(data: any) {
    return this.httpclient.post(this.apiUrl + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  changeOwnPassword(data: any) {
    return this.httpclient.put(this.apiUrl + '/user/changeOwnPassword', data, {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
