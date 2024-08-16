
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { adminLogin, getmealsResponse, GetTrainers, reports, response, userResponse, viewTrainer, viewUser } from "../../../interfaces/IadminService";
import { adminApi } from "../../constant/apiEndPoints";

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

    
    adminLogin(data:number): Observable<adminLogin> {
        
        return this.http.post<adminLogin>(`${BASE_URL}${adminApi}/login`, data)
    }

    get_requests(): Observable<GetTrainers> {
        
        return this.http.get<GetTrainers>(`${BASE_URL}${adminApi}/getTrainersReq`)
    }

    getTrainers(): Observable<GetTrainers> {
        
        return this.http.get<GetTrainers>(`${BASE_URL}${adminApi}/getTrainers`)
    }
    blockTrainer(id:string): Observable<response> {
        return this.http.get<response>(`${BASE_URL}${adminApi}/blockTrainer/${id}`)
    }

    getusers(): Observable<userResponse> { 
        return this.http.get<userResponse>(`${BASE_URL}${adminApi}/getUsers`)
    }

    
    blockUser(id:string): Observable<response> {        
        return this.http.get<response>(`${BASE_URL}${adminApi}/blockUser/${id}`)
    }
   

    trainerApproval(id:string): Observable<response> {

       const approval =  this.http.put<response>(`${BASE_URL}${adminApi}/trainerApproval/${id}`,id)
       return approval
    }
    viewtrainers(id:string): Observable<viewTrainer> {

       const trainers =  this.http.get<viewTrainer>(`${BASE_URL}${adminApi}/viewtrainer/${id}`)
       return trainers
    }
    viewUser(id:string): Observable<viewUser> {

       const trainers =  this.http.get<viewUser>(`${BASE_URL}${adminApi}/viewUser/${id}`)
       return trainers
    }

    addmeal(data:FormData): Observable<response> {
       console.log('enterd the add meal servic ', data);
       
        return  this.http.post<response>(`${BASE_URL}${adminApi}/addmeal`,data)   
    }

    getMeals(): Observable<getmealsResponse> {
        return this.http.get<getmealsResponse>(`${BASE_URL}${adminApi}/getMeals`)
    }

    getReports(): Observable<reports> {
        return this.http.get<reports>(`${BASE_URL}${adminApi}/getReports`)
    }

    sendMail(userId:string,reportId:string): Observable<response> {        
        return this.http.get<response>(`${BASE_URL}${adminApi}/sendMail/${userId}/${reportId}`)
    }

  
}