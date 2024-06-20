import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class adminAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated
    if (this.authService.isAuthenticatedAdmin()) {        
      return true; 
    } else {
      this.router.navigate(['/admin/login']);
      return false; 
    }
  }
}