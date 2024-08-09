
import { Component , OnInit } from '@angular/core';
import {  FormGroup,Validators ,FormBuilder } from '@angular/forms';
import { numericValidator } from '../../../core/utils/otpvalidator';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { trainerService } from '../../../core/services/module-services/trainer.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-otp',
  templateUrl: './otp-trainer.component.html',
  styleUrl: './otp-trainer.component.css'
})
export class TrianerOtpComponent {


}

