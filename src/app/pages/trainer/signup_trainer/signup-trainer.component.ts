import { Component  } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Trainer } from '../../../core/models/trainer';
import { Subscription } from 'rxjs';
import { trainerService } from '../../../core/services/trainer.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-signup',
  templateUrl: './signup-trainer.component.html',
  styleUrl: './signup-trainer.component.css'
})
export class trainerSignupComponent {

  user: Trainer = {
    trainername: '', email: '', password: '',
    isblocked: false,
    isapproved: false,
    specification: '',
    phone: 0,
    image: '',
    availibilty: false,
    availableslots: [],
    _id: ''
  };
  signupForm!:FormGroup
  private signupSubscription: Subscription | null = null;


constructor(private fb: FormBuilder , private service:trainerService  , private router:Router , private messageService:MessageService ) {}

  ngOnInit() {
    console.log('signup page initialized');
    
    this.signupForm = this.fb.group({
      Trainername: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      specification: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.matchValidator('password', 'confirmPassword'),
      updateOn: 'blur'
    }); 
  }



  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup;
      const controlValue = formGroup.controls[controlName].value;
      const matchingControlValue = formGroup.controls[matchingControlName].value;
  
      if (controlValue !== matchingControlValue) {
        formGroup.controls[matchingControlName].setErrors({ confirmedValidator: 'Passwords do not match.' });
        return { confirmedValidator: 'Passwords do not match.' }; 
      } else {
        formGroup.controls[matchingControlName].setErrors(null);
        return null;
      }
    };
  }

  fullvalid(){
    Object.keys(this.signupForm.controls).forEach(control => {
      this.signupForm.get(control)?.markAsTouched();
    });
  }
  
  sendSignupData(data: Trainer) {
    this.signupSubscription = this.service.trainerSignup(data).subscribe({
      next: (res) => {
        if (res && res.message) {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          }, 1000);

          this.signupForm.reset();
            this.router.navigateByUrl('trainer/otp')
        }
      },
      error: (err:any) => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
        }
      },
    }); 
  }



  onSubmit() {
    console.log('form submitted');
    
    if (this.signupForm.valid) {

      const signupdata = JSON.stringify(this.signupForm.value);
      localStorage.setItem('trainerMail', signupdata);
      this.sendSignupData(this.signupForm.value);
    }

  }

  ngOnDestroy() {
    console.log('signuppage destroyued');
    
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe();
    }
      }

}
