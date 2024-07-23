import { Component , ViewEncapsulation } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { adminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation :ViewEncapsulation.None
 
})
export class adminLoginComponent {



  loginForm!:FormGroup
  private LoginSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder , private service:adminService  , private router:Router, private messageService: MessageService ) {}

  ngOnInit() {
    console.log('login page initialized');
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }); 
  }

  fullvalid(){
    Object.keys(this.loginForm.controls).forEach(control => {
      this.loginForm.get(control)?.markAsTouched();
    });
  }

  sendLoginData(data: any) {
    this.LoginSubscription = this.service.adminLogin(data).subscribe({
      next: (res) => {        
        if (res && res.message) {   
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.loginForm.reset();
          localStorage.setItem('adminToken',res.token)
          this.router.navigateByUrl('admin/dashboard')
        }
      },
  
    });
  }
  

  onSubmit(){
    if (this.loginForm.valid) {

      const signupdata = JSON.stringify(this.loginForm.value);
      localStorage.setItem('admin', signupdata);
      this.sendLoginData(this.loginForm.value);
    }
  }

  ngOnDestroy() {
    console.log('login destroyed');
    
    if (this.LoginSubscription) {
      this.LoginSubscription.unsubscribe();
    }
      }



}
