import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Trainer } from '../../../core/models/trainer';
import { Subscription } from 'rxjs';
import { trainerService } from '../../../core/services/trainer.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login-trainer.component.html',
  styleUrl: './login-trainer.component.css'
})
export class trainerLoginComponent {

  user: Trainer = {
    trainername: '', email: '', password: '',
    isblocked: false,
    isapproved: false,
    specification: '',
    phone: 0,
    image: '',
    availibilty: false,
    availableslots: [],
    _id:''

  };
  loginForm!:FormGroup
  private LoginSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder , private service:trainerService  , private router:Router, private messageService:MessageService ) {}

  ngOnInit() {
    console.log('login page initialized');
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }); 
  }

  fullvalid(){
    Object.keys(this.loginForm.controls).forEach(control => {
      this.loginForm.get(control)?.markAsTouched();
    });
  }

  sendLoginData(data: Trainer) {
    this.LoginSubscription = this.service.trainerLogin(data).subscribe({
      next: (res) => {
        if (res && res.message) {     
          console.log('response is ',res);
               
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          }, 1000);
          this.loginForm.reset();          
          localStorage.setItem('trainerToken',res.token)
          this.router.navigateByUrl('trainer/profile')
        }
      },
      error: (err:any) => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
        }
      },
    });
  }
  

  onSubmit(){
    if (this.loginForm.valid) {

      JSON.stringify(this.loginForm.value);
      this.sendLoginData(this.loginForm.value);
    }
  }

  ngOnDestroy() {
    console.log('signuppage destroyed');
    
    if (this.LoginSubscription) {
      this.LoginSubscription.unsubscribe();
    }
      }


}
