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
import { ReusableTableAdminComponent } from '../../shared/reusable-table-admin/reusable-table-admin.component';
import { TableModule } from 'primeng/table';






@NgModule({
    declarations: [
        OtpReuseComponent,
        ReusableTableAdminComponent
        
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
    TableModule
 
    ],
    exports:[OtpReuseComponent,ReusableTableAdminComponent],
    providers: [MessageService],
    bootstrap: []
  })
  export class sharedAppModule { }
  