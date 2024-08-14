
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Trainer } from "../../models/trainer";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { Slot } from "../../models/trainer";
import { trainerApi } from "../../constant/apiEndPoints";
import { response } from "../../../interfaces/IadminService";

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
        return this.http.post(`${BASE_URL}${trainerApi}/signup`, FormData)
    }

  
    otpcheck(data: Number): Observable<any> {        
        return this.http.post(`${BASE_URL}${trainerApi}/otp`, data);
    }

    
    trainerLogin(data:Trainer): Observable<any> {
        return this.http.post(`${BASE_URL}${trainerApi}/login`, data)
    }

    editprofile(data:FormData): Observable<any> {
        
        console.log('ecit profile data is',data);
        
        return this.http.patch(`${BASE_URL}${trainerApi}/editProfile`, data )
    }

    getprofile(): Observable<any> {
        
        return this.http.get(`${BASE_URL}${trainerApi}/getprofile`)
    }

    addSlot(data:Slot[]): Observable<any> {
        

        console.log('slots are in service is ',data);
        
        return this.http.post(`${BASE_URL}${trainerApi}/addslot`,data)
    }

    getslots(): Observable<any> {
        
        return this.http.get(`${BASE_URL}${trainerApi}/getslots`)
    }

    getClients():Observable<any>{
        return this.http.get(`${BASE_URL}${trainerApi}/clients`)
    }

    getbookings(trainerid:string | null):Observable<any>{
        return this.http.get(`${BASE_URL}${trainerApi}/getbookings`)
    }
    editSlot(slotid:string,data:Slot | null):Observable<any>{
        
        return this.http.post(`${BASE_URL}${trainerApi}/editSlot`,{slotid,data})
    }

    addCourse(data:FormData):Observable<any>{
        console.log('Logging FormData entries:');
        data.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });        
        return this.http.post(`${BASE_URL}${trainerApi}/addCourse`,data)
    }

    
    getCourses():Observable<any>{
        return this.http.get<any>(`${BASE_URL}${trainerApi}/getCourses`)
    }


    getRevenueData():Observable<any>{
        return this.http.get<any>(`${BASE_URL}${trainerApi}/getRevenueData`)
    }

    deleteSlot(slotId:string):Observable<response>{
        return this.http.get<response>(`${BASE_URL}${trainerApi}/deleteSlot/${slotId}`)
    }

  
}