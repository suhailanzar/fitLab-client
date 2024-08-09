
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Trainer } from "../../models/trainer";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { Slot } from "../../models/trainer";
import { ICourse } from "../../models/trainer"
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
        return this.http.post(`${BASE_URL}trainer/signup`, FormData)
    }

  
    otpcheck(data: Number): Observable<any> {        
        return this.http.post(`${BASE_URL}trainer/otp`, data);
    }

    
    trainerLogin(data:Trainer): Observable<any> {
        return this.http.post(`${BASE_URL}trainer/login`, data)
    }

    editprofile(data:FormData): Observable<any> {
        
        console.log('ecit profile data is',data);
        
        return this.http.patch(`${BASE_URL}trainer/editProfile`, data )
    }

    getprofile(): Observable<any> {
        
        return this.http.get(`${BASE_URL}trainer/getprofile`)
    }

    addSlot(data:Slot[]): Observable<any> {
        

        console.log('slots are in service is ',data);
        
        return this.http.post(`${BASE_URL}trainer/addslot`,data)
    }

    getslots(): Observable<any> {
        
        return this.http.get(`${BASE_URL}trainer/getslots`)
    }

    getClients():Observable<any>{
        return this.http.get(`${BASE_URL}trainer/clients`)
    }

    getbookings(trainerid:string | null):Observable<any>{
        return this.http.get(`${BASE_URL}trainer/getbookings`)
    }
    editSlot(slotid:string,data:Slot | null):Observable<any>{
        
        return this.http.post(`${BASE_URL}trainer/editSlot`,{slotid,data})
    }

    addCourse(data:FormData):Observable<any>{
        console.log('Logging FormData entries:');
        data.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });        
        return this.http.post(`${BASE_URL}trainer/addCourse`,data)
    }

    
    getCourses():Observable<any>{
        return this.http.get<any>(`${BASE_URL}trainer/getCourses`)
    }


    getRevenueData():Observable<any>{
        return this.http.get<any>(`${BASE_URL}trainer/getRevenueData`)
    }

    deleteSlot(slotId:string):Observable<response>{
        return this.http.get<response>(`${BASE_URL}trainer/deleteSlot/${slotId}`)
    }

  
}