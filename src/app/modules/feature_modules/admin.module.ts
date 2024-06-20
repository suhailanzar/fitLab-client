import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from '../../app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService ,ConfirmationService} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages'
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { adminLoginComponent } from '../../pages/admin/login/login.component';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { SidebarComponent } from '../../pages/admin/sidebarReusable/sidebar.component';
import { TrainersComponent } from '../../pages/admin/trainers/trainers.component';
import { TrainerDetailsComponent } from '../../pages/admin/trainer-details/trainer-details.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../../pages/admin/users/users.component';
import { UserdetailsComponent } from '../../pages/admin/userdetails/userdetails.component';
import { RequestsComponent } from '../../pages/admin/requests/requests.component';
import { RevenueComponent } from '../../pages/admin/revenue/revenue.component';
import { CoursesComponent } from '../../pages/admin/courses/courses.component';
import { ReportsComponent } from '../../pages/admin/reports/reports.component';






@NgModule({
    declarations: [
      adminLoginComponent,
      DashboardComponent,
      SidebarComponent,
      TrainersComponent,
      TrainerDetailsComponent,
      UsersComponent,
      UserdetailsComponent,
      RequestsComponent,
      RevenueComponent,
      CoursesComponent,
      ReportsComponent,
      
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
    ConfirmDialogModule
 
    ],
    providers: [MessageService,ConfirmationService],
    bootstrap: []
  })
  export class AdminAppModule { }
  