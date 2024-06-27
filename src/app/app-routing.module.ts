import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/user/login/login.component';
import { HomepageComponent } from './pages/user/homepage/homepage.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { OtpComponent } from './pages/user/otp/otp.component';
import { LandingpageComponent } from './pages/user/landingpage/landingpage.component';
import { trainerLoginComponent } from './pages/trainer/login-trainer/login-trainer.component';
import { trainerSignupComponent } from './pages/trainer/signup_trainer/signup-trainer.component';
import { TrianerOtpComponent } from './pages/trainer/otp-trainer/otp-trainer.component';
import { adminLoginComponent } from './pages/admin/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { TrainersComponent } from './pages/admin/trainers/trainers.component';
import { TrainerDetailsComponentUser } from './pages/user/trainer-details/trainer-details.component';
import { TrainersComponentuser } from './pages/user/trainers/trainers.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component'
import { RequestsComponent } from './pages/admin/requests/requests.component';
import { ProfileComponent } from './pages/trainer/profile/profile.component';
import { TrainerAuthGuardService } from './core/guards/trainerAuth.guard';
import { userAuthGuardService } from './core/guards/userAuth.guard';
import { adminAuthGuardService } from './core/guards/adminAuth.guard';
import { SlotsComponent } from './pages/trainer/slots/slots.component';
import { TrainerDetailsComponent } from './pages/admin/trainer-details/trainer-details.component';
import { UserProfileComponent } from './pages/user/profile/profile.component';



const routes: Routes = [


  {path:"",component:LandingpageComponent},

  // user routes
  {path:"login", component: LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"otp",component:OtpComponent},
  {path:"userhome",component:HomepageComponent,canActivate: [userAuthGuardService]},
  {path:"trainers",component:TrainersComponentuser,canActivate: [userAuthGuardService]},
  {path:"trainersdetails",component:TrainerDetailsComponentUser,canActivate: [userAuthGuardService]},
  {path:"profile",component:UserProfileComponent,canActivate: [userAuthGuardService]},

  // trainer routes
  {path:"trainer/login",component:trainerLoginComponent},
  {path:"trainer/signup",component:trainerSignupComponent},
  {path:"trainer/otp",component:TrianerOtpComponent},
  {path:"trainer/profile",component:ProfileComponent,canActivate: [TrainerAuthGuardService]},
  {path:"trainer/slot",component:SlotsComponent,canActivate: [TrainerAuthGuardService]},

  // admin routes
  {path:"admin/login",component:adminLoginComponent},
  {path:"admin/dashboard",component:DashboardComponent,canActivate: [adminAuthGuardService]},
  {path:"admin/trainer",component:TrainersComponent,canActivate: [adminAuthGuardService]},
  {path:"admin/trainerdetails/:id",component:TrainerDetailsComponent,canActivate: [adminAuthGuardService]},
  {path:"admin/requests",component:RequestsComponent,canActivate: [adminAuthGuardService]},
  

  // wildcard route
  { path: '**', component: PagenotfoundComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
