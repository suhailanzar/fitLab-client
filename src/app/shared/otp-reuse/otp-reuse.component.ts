import { Component, Input } from '@angular/core';
import {  FormGroup,Validators ,FormBuilder } from '@angular/forms';
import { Subscription , timer  } from 'rxjs';
import { Router } from '@angular/router';
import { ReusableService } from '../../core/services/module-services/reusable.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-otp-reuse',
  templateUrl: './otp-reuse.component.html',
  styleUrl: './otp-reuse.component.css'
})
export class OtpReuseComponent {

  @Input() userType: 'user' | 'trainer' = 'user'; 

  otpForm!: FormGroup;
  private otpsubscription: Subscription | null = null;
  private resendsubcription: Subscription | null = null;
  private timerSubscription: Subscription | null = null;
  public timeLeft: number = 60;


  constructor(private fb: FormBuilder ,private router: Router, private service: ReusableService, private messageService: MessageService ) {}

  ngOnInit() {
    this.startTimer();

    this.otpForm = this.fb.group({
      inputone: ['', Validators.required],
      inputtwo: ['', [Validators.required ]],
      inputthree: ['', [Validators.required ]],
      inputfour: ['', [Validators.required ]],

    });
  }

  onInput(event: Event, nextInput?: HTMLInputElement): void {
    const input = event.target as HTMLInputElement;
    if (input.value && nextInput) {
      nextInput.focus();
    }
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timeLeft = 60;
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.timerSubscription?.unsubscribe();
                console.log('OTP expired');
      }
    });
  }

  sendotpdata(data: number, userType: string) {
    this.otpsubscription = this.service.otpcheck(data, userType).subscribe({
        next: (res) => {
            if (res && res.message) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                this.otpForm.reset();
                const redirectUrl = userType === 'user' ? '/login' : '/trainer/login';
                setTimeout(() => {
                  this.router.navigateByUrl(redirectUrl);
                }, 1000);
            }
        },
        error: (err) => {
            if (err && err.error && err.error.message) {
              this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
            }
        }
    });
}


  
  resendotp(){
    this.resendsubcription = this.service.resentotp(this.otpForm.value,this.userType).subscribe({
      next: (res) => {
        if(res &&  res.message){
          this.startTimer()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.otpForm.reset();

        }
      },error:(err=>{
        if(err&&err.error.message){
          console.log('error',err.error.message);
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });

          
        }
      })
    })
  }

 
  onSubmit() {
    console.log('form submitted');
    
    if (this.otpForm.valid) {

      const signupdata = JSON.stringify(this.otpForm.value);
      this.sendotpdata(this.otpForm.value, this.userType);
    }else{
      this.messageService.add({ severity: 'warn', summary: 'invalid', detail: " enter valid OTP"});
    }

  }

  ngOnDestroy() {
    console.log('otppage destroyed');
    
    if (this.otpsubscription) {
      this.otpsubscription.unsubscribe();
    }
    if( this.resendsubcription){
      this.resendsubcription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
      }
  







}
