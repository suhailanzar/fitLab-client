
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Trainer } from "../../models/trainer";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { Slot } from "../../models/trainer";
import { trainerApi } from "../../constant/apiEndPoints";
import { response } from "../../../interfaces/IadminService";
import { addSlot, getBookingsResponse, getClientsResponse, getSlot, trainerCourseResponse, trainerEditProfile, trainerLogin, trainerProfile, trainerResponse, trainerTransactionResponse } from "../../../interfaces/ItrainerInterface";

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

    trainerSignup(FormData: Trainer): Observable<trainerResponse> {                
        return this.http.post<trainerResponse>(`${BASE_URL}${trainerApi}/signup`, FormData)
    }

  
    otpcheck(data: Number): Observable<trainerResponse> {        
        return this.http.post<trainerResponse>(`${BASE_URL}${trainerApi}/otp`, data);
    }

    
    trainerLogin(data:Trainer): Observable<trainerLogin> {
        return this.http.post<trainerLogin>(`${BASE_URL}${trainerApi}/login`, data)
    }

    editprofile(data:FormData): Observable<trainerEditProfile> {
                
        return this.http.patch<trainerEditProfile>(`${BASE_URL}${trainerApi}/editProfile`, data )
    }

    getprofile(): Observable<trainerProfile> {
        
        return this.http.get<trainerProfile>(`${BASE_URL}${trainerApi}/getprofile`)
    }

    addSlot(data:Slot[]): Observable<addSlot> {
                
        return this.http.post<addSlot>(`${BASE_URL}${trainerApi}/addslot`,data)
    }

    getslots(): Observable<getSlot> {
        
        return this.http.get<getSlot>(`${BASE_URL}${trainerApi}/getslots`)
    }

    getClients():Observable<getClientsResponse>{
        return this.http.get<getClientsResponse>(`${BASE_URL}${trainerApi}/clients`)
    }

    getbookings(trainerid:string | null):Observable<getBookingsResponse>{
        return this.http.get<getBookingsResponse>(`${BASE_URL}${trainerApi}/getbookings`)
    }
    editSlot(slotid:string,data:Slot | null):Observable<trainerResponse>{
        
        return this.http.post<trainerResponse>(`${BASE_URL}${trainerApi}/editSlot`,{slotid,data})
    }

    addCourse(data:FormData):Observable<trainerResponse>{
            
        return this.http.post<trainerResponse>(`${BASE_URL}${trainerApi}/addCourse`,data)
    }

    
    getCourses():Observable<trainerCourseResponse>{
        return this.http.get<trainerCourseResponse>(`${BASE_URL}${trainerApi}/getCourses`)
    }


    getRevenueData():Observable<trainerTransactionResponse>{
        return this.http.get<trainerTransactionResponse>(`${BASE_URL}${trainerApi}/getRevenueData`)
    }

    deleteSlot(slotId:string):Observable<response>{
        return this.http.get<response>(`${BASE_URL}${trainerApi}/deleteSlot/${slotId}`)
    }

  
}