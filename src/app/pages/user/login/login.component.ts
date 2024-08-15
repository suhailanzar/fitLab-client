import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { signUpUser, User } from '../../../core/models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy {

  user: signUpUser = {
    name: '', email: '', password: '',
    isblocked: false,
     };
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
          const userdata = {id:res.userdata._id,name:res.userdata.username,email:res.userdata.email}       
          localStorage.setItem('user', JSON.stringify(userdata));
          this.router.navigateByUrl('/userhome')

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
    
    if (this.LoginSubscription) {
      this.LoginSubscription.unsubscribe();
    }
      }


}
