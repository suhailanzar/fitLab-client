
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer";
import { Observable, of } from "rxjs";
import { environment } from "../../../env/environment";
import { Slot } from "../models/trainer";
import { User } from "../models/user";

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

    addSlot(data:Slot): Observable<any> {
        
        return this.http.post(`${BASE_URL}trainer/addslot`,data)
    }

    getslots(): Observable<any> {
        
        return this.http.get(`${BASE_URL}trainer/getslots`)
    }

    getClients():Observable<any>{
        return this.http.get(`${BASE_URL}trainer/clients`)
    }


  
}