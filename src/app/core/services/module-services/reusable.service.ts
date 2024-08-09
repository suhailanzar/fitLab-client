import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "../../../../env/environment";

const BASE_URL = environment.BASE_URL

@Injectable({
  providedIn: 'root'
})
export class ReusableService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

constructor(private http: HttpClient,) { }

  
otpcheck(data: number, userType: string): Observable<any> {
  console.log('entered the otp check inside the service of reusable',data,userType);
  
  let url = `${BASE_URL}otp`;

  if (userType === 'trainer') {
    console.log('entered the trainer');
    
      url = `${BASE_URL}trainer/otp`; 
  } else if (userType === 'user') {
    console.log('entered the user');

      url = `${BASE_URL}otp`; 
  }
  console.log('final url is ', url);
  
  const repos =  this.http.post(url, data);
  console.log('repos is ', repos);
  return repos
  
}

resentotp( data: number, userType: string ): Observable<any> {
        console.log('entered the reusable service');
        
  let url = `${BASE_URL}resendOtp`;

  if (userType === 'trainer') {
    console.log('enterd the trainer');
    
      url = `${BASE_URL}trainer/resendOtp`; 
  } else if (userType === 'user') {
    console.log('enterd the user in service ');

      url = `${BASE_URL}resendOtp`; 
  }
  const repos =  this.http.post<any>(url,data);
  return repos
  
}


}
