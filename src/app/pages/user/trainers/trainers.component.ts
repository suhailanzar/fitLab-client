import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription, noop } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Slot, Trainer } from '../../../core/models/trainer';
import { FormControl , ReactiveFormsModule  } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {PAY_PAL_CLIENT} from '../../../../env/environment'
import {RZPKEYID,RZPKEYSECRET} from '../../../../env/environment'
import { ChangeDetectorRef } from '@angular/core';

declare var Razorpay: any;


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css',
  encapsulation:ViewEncapsulation.None
})


export class TrainersComponentuser {
  private trainerSubscription: Subscription | null = null;
  trainers: Trainer[] = [];
  filteredTrainers: Trainer[] = [];
  searchControl = new FormControl();
  results: string [] = [];
  hasTypedQuery: boolean = false;
  selectedTrainer: any; // Track the selected trainer here
  visible: boolean = false;
  chatvisible: boolean = false;
  trainer: Trainer | undefined;
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  selectedSlot: Slot | null = null; // Replace with your actual slot type
  userData!:any;
  _trainerid!:string;
  isModalVisible: boolean = false;


  constructor(private service: UserService, private router: Router, private messageService: MessageService , private cdr: ChangeDetectorRef ) {
    this.setupSearchSubscription();
   }

  ngOnInit(): void {
    let userdat = localStorage.getItem("user") || '{}';
    this.userData = JSON.parse(userdat);
    

    this.service.getTrainers().subscribe({
      next: (res => {
        if (res) {
                   
          this.trainers = res.trainers
        }
      }), error: (err => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          console.log('error', err);

        }
      })
    })

    this.initConfig();

    console.log('this.selected trainer is ',this.selectedTrainer);
    
    
  }

  onMessageSent(): void {
    this.cdr.detectChanges(); 
  }

  openslot(id:string){
    this.visible = true
    this.fetchTrainerById(id)
  }

  fetchTrainerById(id: string): void {
    const foundTrainer = this.trainers.find(trainer => trainer._id === id);
    if (foundTrainer) {
      this.trainer = foundTrainer;      
    } else {
      console.log('No trainer found with the given ID');
      this.trainer = undefined; 
    }
  }
  
  
  private setupSearchSubscription() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => !!query || query === ''), // Include empty query ('') to clear results
      switchMap(query => {
        if (query === '') {
          this.clearSearch(); // Clear results if query is empty
          return [];
        } else {
          return this.service.searchTrainers(query);
        }
      })
    ).subscribe({
      next: results => {
        this.results = results;
        this.hasTypedQuery = true;
      },
      error: error => {
        console.error('Error fetching search results', error);
      }
    });
  }


  clearSearch(): void {
    this.searchControl.setValue('');
    this.results = []; 
    this.hasTypedQuery = false; 
    this.selectedTrainer = null;
  }


  selectTrainer(trainer: string): void {    
    this.selectedTrainer = this.trainers.find(t => t.trainername === trainer);    
    this.results = []; 
  }


  selectSlot(slot: any) {
    this.selectedSlot = slot;
    
  }

  clearSelectedSlot(){
    this.selectedSlot = null;
  }

// paypal integration

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: PAY_PAL_CLIENT,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical',
      height: 45, // Size of the button
      shape: 'pill', // Shape of the button
      color: 'silver', // Color of the button
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


  // razorpay integration
  checkout() {

    if (!this.selectedSlot ||!this.trainer) {
      console.error('Selected slot or trainer is null');
      return;
    }  
     
      const options = {
        key: RZPKEYID, 
        amount: this.selectedSlot.price * 100,
        currency: 'INR',
        name: 'fitLab',
        description: 'payment for meeting',
        handler: (response: any) => {
          this.handlePaymentSuccess(response);         
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
  

    
    handlePaymentSuccess(response: any) {
      if (!this.selectedSlot ||!this.trainer) {
        console.error('Selected slot or trainer is null');
        return;
      }
    
      const paymentData = {
        razorpayPaymentId: response.razorpay_payment_id,
        amount: this.selectedSlot.price * 100 ,
        currency: 'INR',
        userid: this.userData.id,
        slotid: this.selectedSlot?._id,
        trainerid: this.trainer?._id ?? ''
      };

      console.log('payment details are ',paymentData);
      

      this.service.bookslot(paymentData).subscribe({
        next: (result) => {
          this.messageService.add({ severity: 'success', summary: 'Payment', detail: "Payment Successful and Saved" });
          this.visible = false;
          this.cdr.detectChanges(); // Trigger change detection manually
          this.ngOnInit()

        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Payment', detail: "Payment Successful but Failed to Save Details" });
          console.error('Error saving payment details:', error);
        }
      });
      
    }


    openchat(trainerid:string){      
      this._trainerid = trainerid      
      this.chatvisible = true;
      this.isModalVisible = true; // Show the modal
      
    }
    

 
}






