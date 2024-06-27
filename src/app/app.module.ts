import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { trainerAppModule } from './modules/feature_modules/trainer.module';
import { UserAppModule } from './modules/feature_modules/user.module';
import { AdminAppModule } from './modules/feature_modules/admin.module';
import { sharedAppModule } from './modules/custom_modules/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtHttpInterceptor } from '../app/core/interceptors/jwt-decode.interceptor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
 
    
  
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    MessagesModule,
    trainerAppModule,
    UserAppModule,
    AdminAppModule,
    sharedAppModule,
    
  ],

  providers: [MessageService ,  { provide: HTTP_INTERCEPTORS, useClass: jwtHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
