import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from '../../app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';

import { CommonModule } from '@angular/common';
import { OtpReuseComponent } from '../../shared/otp-reuse/otp-reuse.component';






@NgModule({
    declarations: [
        OtpReuseComponent
    ],
    imports: [  
    CommonModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    BrowserAnimationsModule,
    MessagesModule,
 
    ],
    exports:[OtpReuseComponent],
    providers: [MessageService],
    bootstrap: []
  })
  export class sharedAppModule { }
  