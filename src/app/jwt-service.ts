import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.getDecodedAccessToken(token);
    if (decodedToken && decodedToken.exp) {
      return Math.floor(Date.now() / 1000) >= decodedToken.exp;
    }
    return true; 
  }
}