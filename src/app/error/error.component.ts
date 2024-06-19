import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit{
  redirectLink: string = '';

constructor (private jwtService : JwtService, private router: Router) { }

ngOnInit(): void {
  if (this.isAuthenticated()) {
    this.redirectLink = '/dash';
  } else {
    this.redirectLink = '/';
  }
}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token ? !this.jwtService.isTokenExpired(token) : false;
  }
}
