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
import { UsersComponentadmin } from '../../pages/admin/users/users.component';
import { UserdetailsComponent } from '../../pages/admin/userdetails/userdetails.component';
import { RequestsComponent } from '../../pages/admin/requests/requests.component';
import { RevenueComponentAdmin } from '../../pages/admin/revenue/revenue.component';
import { CoursesComponentadmin } from '../../pages/admin/courses/courses.component';
import { AddmealComponent } from '../../pages/admin/addmeal/addmeal.component';
import { MealPlansComponent } from '../../pages/admin/meal-plans/meal-plans.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { sharedAppModule } from '../custom_modules/shared.module';
import { ReportsAdminComponent } from '../../pages/admin/reports-admin/reports-admin.component';
import { DialogModule } from 'primeng/dialog';





@NgModule({
    declarations: [
      adminLoginComponent,
      DashboardComponent,
      SidebarComponent,
      TrainersComponent,
      TrainerDetailsComponent,
      UsersComponentadmin,
      UserdetailsComponent,
      RequestsComponent,
      RevenueComponentAdmin,
      CoursesComponentadmin,
      AddmealComponent,
      MealPlansComponent,
      ReportsAdminComponent
      
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
    ConfirmDialogModule,
    TableModule,
    PaginatorModule,
    sharedAppModule,
    DialogModule
 
    ],
    providers: [MessageService,ConfirmationService],
    bootstrap: []
  })
  export class AdminAppModule { }
  