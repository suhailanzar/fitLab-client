
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { coursePayment, Payment, User } from "../../models/user";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { reportResponse } from "../../../interfaces/IuserService";

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

    userLogin(data: User): Observable<any> {
        return this.http.post(`${BASE_URL}login`, data)
    }

    getTrainers(): Observable<any> {
        return this.http.get<any>(`${BASE_URL}gettrainers`);
    }


    searchTrainers(query: string): Observable<string[]> {
        return this.http.get<string[]>(`${BASE_URL}searchtrainers?q=${encodeURIComponent(query)}`);
    }

    bookslot(paymentData: Payment): Observable<any> {
        return this.http.post(`${BASE_URL}bookslot`, paymentData)
    }

    editprofile(data: FormData): Observable<any> {

        return this.http.post(`${BASE_URL}editprofile`, data)
    }

    getprofile(): Observable<any> {

        return this.http.get(`${BASE_URL}getprofile`)
    }

    getAllCourses(currentpage: number, limit: number): Observable<any> {

        return this.http.get(`${BASE_URL}getCourse`, {
            params: {
                page: currentpage.toString(),
                limit: limit.toString()
            }
        });
    }
    getCourseDetails(id: string | null): Observable<any> {
        return this.http.get(`${BASE_URL}getCourseDetails/${id}`)
    }


    saveCourse(paymentDetails: coursePayment): Observable<any> {
        console.log('paymetn details are', paymentDetails);

        return this.http.post(`${BASE_URL}saveCourse`, paymentDetails)
    }

    getPurchasedCourses(): Observable<any> {

        return this.http.get(`${BASE_URL}getPurchasedCourses`)
    }

    updateModuleCompletion(moduleId: string, courseId: string | null, completed: boolean): Observable<any> {

        return this.http.put(`${BASE_URL}updateModuleCompletion/${moduleId}/${courseId}`, { completed });

    }

    submitReport(data: FormData): Observable<reportResponse> {
        console.log('got the datain service ',data);
        
        return this.http.post<reportResponse>(`${BASE_URL}submitReport`, data);
    }
    


}