import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, ActivatedRouteSnapshot  } from '@angular/router';
import { JwtService } from './jwt-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('authToken');
    const roles = JSON.parse(localStorage.getItem('role') || '[]');

    if (token) {
      if (token && this.jwtService.isTokenExpired(token)) {
        this.logout(); // Call logout function
        return false;
      }
      if (expectedRole && !roles.includes(expectedRole)) { // Check if user has the role
         this.router.navigate(['/error']); // Redirect if no matching role
         return false;
      }
      return true; //  Allow access
   } else {
     this.router.navigate(['/error']); 
     return false;
   }
 }
 logout(): void {
  localStorage.removeItem('authToken');
  this.router.navigate(['/']);
}
}