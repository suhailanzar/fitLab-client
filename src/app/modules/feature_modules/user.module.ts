import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { LoginComponent } from '../../pages/user/login/login.component';
import { SignupComponent } from '../../pages/user/signup/signup.component';
import { HomepageComponent } from '../../pages/user/homepage/homepage.component';
import { LandingpageComponent } from '../../pages/user/landingpage/landingpage.component';
import { SidebarComponent } from '../../pages/user/sidebarReusableuser/sidebar.component';
import { TrainersComponentuser } from '../../pages/user/trainers/trainers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { OtpComponent } from '../../pages/user/otp/otp.component';
import { sharedAppModule } from './shared.module';
import { CoursesComponent } from '../../pages/user/courses/courses.component';
import { ProfileComponent } from '../../pages/user/profile/profile.component';
import { CartComponent } from '../../pages/user/cart/cart.component';
import { ReportsComponent } from '../../pages/user/reports/reports.component';
import { DietPlansComponent } from '../../pages/user/diet-plans/diet-plans.component';
import { TrainerDetailsComponent } from '../../pages/user/trainer-details/trainer-details.component';
import { BookSlotComponent } from '../../pages/user/book-slot/book-slot.component';
import { SubscriptionComponent } from '../../pages/user/subscription/subscription.component';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        HomepageComponent,
        OtpComponent,
        LandingpageComponent,
        SidebarComponent,
        TrainersComponentuser,
        CoursesComponent,
        ProfileComponent,
        CartComponent,
        DietPlansComponent,
        ReportsComponent,
        TrainerDetailsComponent,
        BookSlotComponent,
        SubscriptionComponent,
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        ToastModule,
        ButtonModule,
        RippleModule,
        BrowserAnimationsModule,
        MessagesModule,
        CardModule,
        sharedAppModule,
        DataViewModule,
        TagModule,
        RatingModule,
        FormsModule
        
    ],
    providers: [MessageService],
    bootstrap: []
})
export class UserAppModule { }
