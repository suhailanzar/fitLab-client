
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer";
import { Observable, of } from "rxjs";
import { environment } from "../../../env/environment";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class trainerService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
 
    constructor(
        private http: HttpClient,
    ) { }

    trainerSignup(FormData: Trainer): Observable<any> {                
        return this.http.post(`${BASE_URL}trainer/signup`, FormData)
    }

  
    otpcheck(data: Number): Observable<any> {
        console.log('data  from front end o',data);
        
        return this.http.post(`${BASE_URL}trainer/otp`, data);
    }

    
    trainerLogin(data:Trainer): Observable<any> {
        return this.http.post(`${BASE_URL}trainer/login`, data)
    }

    editprofile(data:FormData): Observable<any> {
        

        return this.http.patch(`${BASE_URL}trainer/editProfile`, data )
    }

    getprofile(): Observable<any> {
        
        return this.http.get(`${BASE_URL}trainer/getprofile`)
    }


  
}