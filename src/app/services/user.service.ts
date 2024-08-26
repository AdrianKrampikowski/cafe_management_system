import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';
import { AuthService } from './auth.service';
import { OwncookieService } from './owncookie.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = enviroment.apiUrl;
  // token: any = this.authService.token;
  token: any = this.ownCookieService.getDecodedToken();
  constructor(
    private httpclient: HttpClient,
    private authService: AuthService,
    private ownCookieService: OwncookieService
  ) {}

  loadAllUser() {
    return this.httpclient.get(this.apiUrl + '/user/getAllUsers', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  changeUserStatus(status: boolean, id: string) {
    const data = { status: status, id: id };
    return this.httpclient.patch(this.apiUrl + '/user/updateUser', data, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
