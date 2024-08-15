import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { signUpUser, User } from '../../../core/models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user: signUpUser = {
    name: '', email: '', password: '',
    isblocked: false,
    };

  signupForm!: FormGroup
  private signupSubscription: Subscription | null = null;


  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

  fullvalid() {
    Object.keys(this.signupForm.controls).forEach(control => {
      this.signupForm.get(control)?.markAsTouched();
    });
  }

  sendSignupData(data: User) {
    this.signupSubscription = this.service.userSignup(data).subscribe({
      next: (res) => {

        if (res && res.message) {
          setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        }, 1000);

          this.signupForm.reset();
            this.router.navigateByUrl('/otp');
        }
      },
      error: (err: any) => {
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
      localStorage.setItem('userMail', signupdata);
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
