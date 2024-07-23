
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class jwtHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService , private router:Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    

    const userToken = localStorage.getItem('userToken') || undefined;
    const trainerToken = localStorage.getItem('trainerToken') || undefined;
    const adminToken = localStorage.getItem('adminToken') || undefined;


    let authReq = this.addTokens(req, userToken, trainerToken, adminToken);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Interceptor caught an error:', error);
        if (error.status === 401) {
          console.log('401 Unauthorized error detected');
          this.handleUnauthorizedError();
        }
        return throwError(error);
      })
    );
  }

  private addTokens(req: HttpRequest<any>, userToken?: string, trainerToken?: string, adminToken?: string): HttpRequest<any> {
    let authReq = req;
    if (userToken) {
      authReq = authReq.clone({
        headers: authReq.headers.set('authorization-user', `Bearer ${userToken}`)
      });
    }
    if (trainerToken) {
      authReq = authReq.clone({
        headers: authReq.headers.set('authorization-trainer', `Bearer ${trainerToken}`)
      });
    }
    if (adminToken) {
      authReq = authReq.clone({
        headers: authReq.headers.set('authorization-Admin', `Bearer ${adminToken}`)
      });
    }
    return authReq;
  }

  private handleUnauthorizedError(): void {
    // Clear all tokens
    localStorage.removeItem('userToken');
    localStorage.removeItem('trainerToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    localStorage.removeItem('trainer');

    // Redirect to login page
    this.router.navigate(['/']);

   
    console.log('Your session has expired. Please log in again.');
  }
}



