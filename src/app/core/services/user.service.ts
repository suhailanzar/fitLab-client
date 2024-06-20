
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable, of } from "rxjs";
import { environment } from "../../../env/environment";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
 
    constructor(
        private http: HttpClient,
    ) { }

    userSignup(FormData: User): Observable<any> {
                
        return this.http.post(`${BASE_URL}signup`, FormData)
    }


    
    userLogin(data:User): Observable<any> {
        return this.http.post(`${BASE_URL}login`, data)
    }

    getTrainers(): Observable<any> {
        
        return this.http.get<any>(`${BASE_URL}gettrainers`);
      }


      searchTrainers(query: string ): Observable<string []> {
        return this.http.get<string []>(`${BASE_URL}searchtrainers?q=${encodeURIComponent(query)}`);
      }

   
}