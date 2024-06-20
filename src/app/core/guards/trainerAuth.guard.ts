import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerAuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    
    console.log('enter the trainer guard', this.authService.isAuthenticatedTrainer());
    if (this.authService.isAuthenticatedTrainer()) {
      return true;
    } else {
      this.router.navigate(['trainer/login']);
      return false;
    }
  };
}