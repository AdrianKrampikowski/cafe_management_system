import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';
import { OwncookieService } from './owncookie.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpclient: HttpClient,
    private ownCookieService: OwncookieService,
    private cookieService: CookieService
  ) {}
  apiUrl = enviroment.apiUrl;
  userLogined: boolean = false;
  token: any = this.ownCookieService.getDecodedToken();

  getHeaders() {
    const encodedToken = this.ownCookieService.getEncodedToken(); 
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${encodedToken}`,
      }),
    };

    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.token}`
    // );
    // return headers;
  }

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
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  isLoggedIn(): boolean {
    const sessionToken = this.cookieService.get('encodedToken');
    if (sessionToken) {
      return true;
    } else {
      return false;
    }
  }
}
