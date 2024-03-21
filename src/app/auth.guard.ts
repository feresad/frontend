import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, ActivatedRouteSnapshot  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('authToken');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    if (token && roles.includes(expectedRole)) {
      return true;
    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }
}