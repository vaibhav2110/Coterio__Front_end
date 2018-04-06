import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';

import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';

import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { ProcessHTTPService } from './services/process-http.service';
import { ArticleService } from './services/article.service';
import { UserService } from './services/user.service';


import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MeComponent } from './me/me.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ProfileComponent,
    MeComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
      ReactiveFormsModule
  ],
  providers: [ AuthenticationService,
              ProcessHTTPService,
              ArticleService,
              UserService,
              { provide: 'BaseURL', useValue: baseURL },
             {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
