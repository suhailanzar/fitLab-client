
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { adminLogin, GetTrainers, reports, response, userResponse, viewTrainer } from "../../../interfaces/IadminService";
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
    viewUser(id:string): Observable<any> {

       const trainers =  this.http.get(`${BASE_URL}${adminApi}/viewUser/${id}`)
       return trainers
    }

    addmeal(data:FormData): Observable<any> {
        data.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        return  this.http.post(`${BASE_URL}${adminApi}/addmeal`,data)   
    }

    getMeals(): Observable<any> {
        return this.http.get(`${BASE_URL}${adminApi}/getMeals`)
    }

    getReports(): Observable<reports> {
        return this.http.get<reports>(`${BASE_URL}${adminApi}/getReports`)
    }

    sendMail(userId:string,reportId:string): Observable<response> {        
        return this.http.get<response>(`${BASE_URL}${adminApi}/sendMail/${userId}/${reportId}`)
    }

  
}