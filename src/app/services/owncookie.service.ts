import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class OwncookieService {
  constructor(private cookieService: CookieService) {}

  private encodeToken(token: string) {
    return btoa(token);
  }

  private decodedToken(encodedToken: string) {
    return atob(encodedToken);
  }

  setToken(token: string) {
    const encodedToken = this.encodeToken(token);
    // this.cookieService.set('token', token, {
    //   expires: 7,
    //   path: '/',
    // });
    this.cookieService.set('encodedToken', encodedToken, {
      expires: 7,
      path: '/',
      secure: true, // Ensure the connection is secure if you're using HTTPS
      sameSite: 'Lax', // Or 'None' if the cookie is used cross-site
    });
  }

  getDecodedToken() {
    const encodedToken = this.cookieService.get('encodedToken');
    return this.decodedToken(encodedToken);
    // const decodedToken =
    // return this.cookieService.get('token');
  }

  deleteToken() {
    this.cookieService.delete('token', '/');
  }
}
