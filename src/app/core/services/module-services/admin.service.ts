
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { reports, response, userResponse } from "../../../interfaces/IadminService";

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
    blockTrainer(id:string): Observable<response> {
        return this.http.get<response>(`${BASE_URL}admin/blockTrainer/${id}`)
    }

    getusers(): Observable<userResponse> { 
        return this.http.get<userResponse>(`${BASE_URL}admin/getUsers`)
    }

    
    blockUser(id:string): Observable<response> {        
        return this.http.get<response>(`${BASE_URL}admin/blockUser/${id}`)
    }
   

    trainerApproval(id:string): Observable<any> {

       const approval =  this.http.put(`${BASE_URL}admin/trainerApproval/${id}`,id)
       return approval
    }
    viewtrainers(id:string): Observable<any> {

       const trainers =  this.http.get(`${BASE_URL}admin/viewtrainer/${id}`)
       return trainers
    }
    viewUser(id:string): Observable<any> {

       const trainers =  this.http.get(`${BASE_URL}admin/viewUser/${id}`)
       return trainers
    }

    addmeal(data:FormData): Observable<any> {
        data.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        return  this.http.post(`${BASE_URL}admin/addmeal`,data)   
    }

    getMeals(): Observable<any> {
        return this.http.get(`${BASE_URL}admin/getMeals`)
    }

    getReports(): Observable<reports> {
        return this.http.get<reports>(`${BASE_URL}admin/getReports`)
    }

    sendMail(id:string): Observable<response> {
        return this.http.get<response>(`${BASE_URL}admin/sendMail/${id}`)
    }

  
}