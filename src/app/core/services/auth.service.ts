import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Authenticateduser = false;
  private Authenticatedadmin = false;
  private Authenticatedtrainer = false;

  constructor(private router: Router) {}

  userlogout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this.Authenticateduser = false;
    this.router.navigate(['/login']); 
  }

  adminlogout(): void {
    localStorage.removeItem('adminToken');
    this.Authenticatedadmin = false;
    this.router.navigate(['/admin/login']); 
  }

  trainerlogout(): void {
    localStorage.removeItem('trainerToken');
    this.Authenticatedtrainer = false;
    this.router.navigate(['/trainer/login']); 
  }

  isAuthenticatedAdmin(): boolean {
    const adminToken = localStorage.getItem('adminToken');
    return adminToken !== null && adminToken.trim() !== '';
  }

  isAuthenticatedTrainer(): boolean {
    const trainerToken = localStorage.getItem('trainerToken');
    return trainerToken !== null && trainerToken.trim() !== '';
  }

  isAuthenticatedUser(): boolean {
    const userToken = localStorage.getItem('userToken');
    return userToken !== null && userToken.trim() !== '';
  }}
