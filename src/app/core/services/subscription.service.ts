import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../env/environment";
import { Payment, User } from "../models/user";


const BASE_URL = environment.BASE_URL

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subscribe(paymentData: { razorpayPaymentId: any; amount: number; currency: string; userId: any; planId: any; }) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://api.yourapp.com/subscriptions';

  constructor(private http: HttpClient) { }

  subscription(paymentData: any): Observable<any> {
    console.log('detals are',paymentData);
    
    return this.http.post(`${BASE_URL}subscribe`, paymentData)
}
}
