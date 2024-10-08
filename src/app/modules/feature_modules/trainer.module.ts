import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from '../../app-routing.module';
import { trainerLoginComponent } from '../../pages/trainer/login-trainer/login-trainer.component';
import { trainerSignupComponent } from '../../pages/trainer/signup_trainer/signup-trainer.component';
import { TrianerOtpComponent } from '../../pages/trainer/otp-trainer/otp-trainer.component';
import { CoursesComponent } from '../../pages/trainer/courses/courses.component';
import { ClientsComponent } from '../../pages/trainer/clients/clients.component';
import { RevenueComponent } from '../../pages/trainer/revenue/revenue.component';
import { ProfileComponent } from '../../pages/trainer/profile/profile.component';
import { SlotsComponent } from '../../pages/trainer/slots/slots.component';
import { SidebarComponent } from '../../pages/trainer/sidebarReusabletrainer/sidebar.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages'
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';


import { CommonModule } from '@angular/common';
import { sharedAppModule } from '../custom_modules/shared.module';
import { ClientDetailsComponent } from '../../pages/trainer/client-details/client-details.component';
import { AddCourseComponent } from '../../pages/trainer/add-course/add-course.component';
import { EditCourseComponent } from '../../pages/trainer/edit-course/edit-course.component';
import { ResetPasswordComponent } from '../../pages/trainer/reset-password/reset-password.component';
import { TraineChatComponent } from '../../pages/trainer/traine-chat/traine-chat.component';
import { CoursedetailsAdminComponent } from '../../pages/trainer/coursedetails-admin/coursedetails-admin.component';
import { AccordionModule } from 'primeng/accordion';
import { VideoCallTrainerComponent } from '../../pages/trainer/video-call-trainer/video-call-trainer.component';
import { TableModule } from 'primeng/table';


@NgModule({
    declarations: [
      trainerLoginComponent,
      trainerSignupComponent,
      TrianerOtpComponent,
      CoursesComponent,
      ClientsComponent,
      RevenueComponent,
      ProfileComponent,
      SlotsComponent,
      ClientDetailsComponent,
      AddCourseComponent,
      EditCourseComponent,
      ResetPasswordComponent,
      SidebarComponent,
      TraineChatComponent,
      CoursedetailsAdminComponent,
      VideoCallTrainerComponent,
 

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
    DialogModule,
    FileUploadModule,
    AvatarModule,
    sharedAppModule,
    FormsModule,
    DataViewModule,
    ProgressSpinnerModule,
    ChartModule,
    AccordionModule,
    TableModule


    ],
    providers: [MessageService ],
    bootstrap: []
  })
  export class trainerAppModule { }
  