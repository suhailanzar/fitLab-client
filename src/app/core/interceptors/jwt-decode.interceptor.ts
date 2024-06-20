
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class jwtHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    

    const userToken = localStorage.getItem('userToken');
    const trainerToken = localStorage.getItem('trainerToken');
    const adminToken = localStorage.getItem('adminToken');

    if (userToken || trainerToken || adminToken) {
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
        

        return next.handle(authReq);
    } else {
        return next.handle(req);
    }
}
}