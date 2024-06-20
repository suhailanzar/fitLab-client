
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../env/environment";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class adminService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
 
    constructor(
        private http: HttpClient,
    ) { }

    
    adminLogin(data:number): Observable<any> {
        
        return this.http.post(`${BASE_URL}admin/login`, data)
    }

    get_requests(): Observable<any> {
        
        return this.http.get(`${BASE_URL}admin/getTrainersReq`)
    }

    getTrainers(): Observable<any> {
        
        return this.http.get(`${BASE_URL}admin/getTrainers`)
    }

    trainerApproval(id:string): Observable<any> {

       const approval =  this.http.put(`${BASE_URL}admin/trainerApproval/${id}`,id)
       return approval
    }
    viewtrainers(id:string): Observable<any> {

       const trainers =  this.http.get(`${BASE_URL}admin/viewtrainer/${id}`)
       return trainers
    }

  
}