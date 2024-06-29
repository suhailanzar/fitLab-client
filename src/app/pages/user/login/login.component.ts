import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../../../core/models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: User = {
    name: '', email: '', password: '',
    isblocked: false,
    gender: '',
    weight: 0,
    height: 0,
    createdAt: new Date(),  };
  loginForm!:FormGroup
  private LoginSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder , private service:UserService  , private router:Router, private messageService: MessageService ) {}

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

  sendLoginData(data: User) {
    this.LoginSubscription = this.service.userLogin(data).subscribe({
      next: (res) => {
        
        if (res && res.message) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.loginForm.reset();          
          localStorage.setItem('userToken',res.token)          
          localStorage.setItem('user', JSON.stringify(res.userdata));
          this.router.navigateByUrl('/userhome')

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

      const signupdata = JSON.stringify(this.loginForm.value);
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
