
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { coursePayment, Payment, User } from "../../models/user";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";
import { completeModule, courseDetailsRes, editProfileRes, getPurchasedCoursesRes, GetTrainersUser, reportResponse, reports, saveMealResponse, userCourseResponse, userLogin, userResponse } from "../../../interfaces/IuserService";
import { Meal } from "../../models/admin";

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

    userSignup(FormData: User): Observable<userResponse> {

        return this.http.post<userResponse>(`${BASE_URL}signup`, FormData)
    }

    userLogin(data: User): Observable<userLogin> {
        return this.http.post<userLogin>(`${BASE_URL}login`, data)
    }

    getTrainers(): Observable<GetTrainersUser> {
        return this.http.get<GetTrainersUser>(`${BASE_URL}gettrainers`);
    }


    searchTrainers(query: string): Observable<string[]> {
        return this.http.get<string[]>(`${BASE_URL}searchtrainers?q=${encodeURIComponent(query)}`);
    }

    bookslot(paymentData: Payment): Observable<userResponse> {
        return this.http.post<userResponse>(`${BASE_URL}bookslot`, paymentData)
    }

    editprofile(data: FormData): Observable<editProfileRes> {

        return this.http.post<editProfileRes>(`${BASE_URL}editprofile`, data)
    }

    getprofile(): Observable<editProfileRes> {
        return this.http.get<editProfileRes>(`${BASE_URL}getprofile`)
    }

    getAllCourses(currentpage: number, limit: number): Observable<userCourseResponse> {

        return this.http.get<userCourseResponse>(`${BASE_URL}getCourse`, {
            params: {
                page: currentpage.toString(),
                limit: limit.toString()
            }
        });
    }
    getCourseDetails(id: string | null): Observable<courseDetailsRes> {
        return this.http.get<courseDetailsRes>(`${BASE_URL}getCourseDetails/${id}`)
    }


    saveCourse(paymentDetails: coursePayment): Observable<userResponse> {
        return this.http.post<userResponse>(`${BASE_URL}saveCourse`, paymentDetails)
    }

    getPurchasedCourses(): Observable<getPurchasedCoursesRes> {

        return this.http.get<getPurchasedCoursesRes>(`${BASE_URL}getPurchasedCourses`)
    }

    updateModuleCompletion(moduleId: string, courseId: string | null, completed: boolean): Observable<completeModule> {

        return this.http.put<completeModule>(`${BASE_URL}updateModuleCompletion/${moduleId}/${courseId}`, { completed });

    }

    submitReport(data: FormData): Observable<reportResponse> {
        console.log('got the datain service ',data);
        
        return this.http.post<reportResponse>(`${BASE_URL}submitReport`, data);
    }

    saveMeal(name:string,meal:Meal[]): Observable<saveMealResponse>{
        console.log('meals in teh service are',name,meal);
        
        return this.http.post<saveMealResponse>(`${BASE_URL}saveMeal`,{name,meal})
    }

    getReportsUser(): Observable<reports>{        
        return this.http.get<reports>(`${BASE_URL}getReportsUser`)
    }
  
}