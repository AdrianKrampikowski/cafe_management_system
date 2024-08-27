import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class OwncookieService {
  // encodedToken = this.cookieService.get('encodedToken');

  constructor(private cookieService: CookieService) {}

  private encodeToken(token: string) {
    return btoa(token);
  }

  private decodedToken(encodedToken: string) {
    return atob(encodedToken);
  }

  setToken(token: string) {
    // Don't encode the token, just store it directly
    this.cookieService.set('encodedToken', token, {
      expires: 7,
      path: '/',
      secure: true, // Only sent over HTTPS
      sameSite: 'Lax',
    });
  }
  // setToken(token: string) {
  //   const encodedToken = this.encodeToken(token);
  //   console.log('Original Token:', token);
  //   console.log('Encoded Token:', encodedToken);
  //   this.cookieService.set('encodedToken', encodedToken, {
  //     expires: 7,
  //     path: '/',
  //     secure: true,
  //     sameSite: 'Lax',
  //   });
  // }

  getEncodedToken() {
    return this.cookieService.get('encodedToken');
  }

  getDecodedToken() {
    const encodedToken = this.getEncodedToken();
    return encodedToken;
  }
  // getDecodedToken() {
  //   const encodedToken = this.cookieService.get('encodedToken');
  //   return this.decodedToken(encodedToken);
  //   // const decodedToken =
  //   // return this.cookieService.get('token');
  // }

  deleteToken() {
    this.cookieService.delete('token', '/');
  }
}
