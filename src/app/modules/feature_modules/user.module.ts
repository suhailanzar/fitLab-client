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
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { AccordionModule } from 'primeng/accordion';


import { OtpComponent } from '../../pages/user/otp/otp.component';
import { sharedAppModule } from '../custom_modules/shared.module';
import { CoursesComponentuser } from '../../pages/user/courses/courses.component';
import { UserProfileComponent } from '../../pages/user/profile/profile.component';
import { CartComponent } from '../../pages/user/cart/cart.component';
import { ReportsComponent } from '../../pages/user/reports/reports.component';
import { DietPlansComponent } from '../../pages/user/diet-plans/diet-plans.component';
import { TrainerDetailsComponentUser } from '../../pages/user/trainer-details/trainer-details.component';
import { SubscriptionComponent } from '../../pages/user/subscription/subscription.component';
import { IstPipe } from '../../core/pipes/ist.pipe';
import { NgxPayPalModule } from 'ngx-paypal';
import { AvailableSlotsPipe } from '../../core/pipes/available-slots.pipe';
import { SocketIoModule } from 'ngx-socket-io';
import { config } from '../../../../socket-config';
import { UserchatComponent } from '../../pages/user/userchat/userchat.component';
import { CoursedetailsComponent } from '../../pages/user/coursedetails/coursedetails.component';
import { MycourseComponent } from '../../pages/user/mycourse/mycourse.component';
import { MycourseViewComponent } from '../../pages/user/mycourse-view/mycourse-view.component';



@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        HomepageComponent,
        OtpComponent,
        LandingpageComponent,
        SidebarComponent,
        TrainersComponentuser,
        CoursesComponentuser,
        UserProfileComponent,
        CartComponent,
        DietPlansComponent,
        ReportsComponent,
        TrainerDetailsComponentUser,
        SubscriptionComponent,
        IstPipe,
        AvailableSlotsPipe,
        UserchatComponent,
        SubscriptionComponent,
        CoursedetailsComponent,
        MycourseComponent,
        MycourseViewComponent

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
        CarouselModule,
        sharedAppModule,
        DataViewModule,
        AvatarModule,
        TagModule,
        RatingModule,
        FormsModule,
        DialogModule,
        NgxPayPalModule,
        SocketIoModule.forRoot(config),
        ProgressSpinnerModule,
        AccordionModule

    ],
    providers: [MessageService],
    bootstrap: []
})
export class UserAppModule { }
