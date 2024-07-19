import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { RZPKEYID } from '../../../../env/environment';
import { MessageService } from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  plans = [
    { id: 1, name: 'Basic Plan', description: 'Access to basic features', price: 10 },
    { id: 2, name: 'Standard Plan', description: 'Access to standard features', price: 20 },
    { id: 3, name: 'Premium Plan', description: 'Access to all features', price: 30 }
  ];

  userData: any = {}; 
  selectedSlot: any = {}; 
  trainer: any = {}; 
  visible: boolean = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('this user data is',this.userData);
    
  }


  // Razorpay integration
  checkout(id: number): void {
    const plan = this.plans.find(p => p.id === id);
    if (!plan) {
      console.error('Selected plan not found');
      return;
    }

    const options = {
      key: RZPKEYID,
      amount: plan.price * 100,
      currency: 'INR',
      name: 'fitLab',
      description: 'Payment for subscription',
      handler: (response: any) => {
        this.handlePaymentSuccess(response, plan);
      },
      prefill: {
        email: this.userData.email,
      },
      theme: {
        color: '#3b28fe'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  handlePaymentSuccess(response: any, plan: any): void {
    const paymentData = {
      razorpayPaymentId: response.razorpay_payment_id,
      amount: plan.price * 10,
      currency: 'INR',
      userid: this.userData.id,
      planId:plan.id ,
      planname:plan.name
    };

    console.log('Payment details are', paymentData);

    this.subscriptionService.subscription(paymentData).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/userhome')
        this.messageService.add({ severity: 'success', summary: 'Payment', detail: 'Payment Successful and Saved' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Payment', detail: 'Payment Successful but Failed to Save Details' });
        console.error('Error saving payment details:', error);
      }
    });
  }
}
