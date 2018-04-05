import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { baseURL } from '../shared/baseurl';

import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ProcessHTTPService } from './process-http.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


interface AuthResponse {
    status: string,
    success: string,
    token: string,
    user: any
};

interface JWTResponse {
    status: string,
    success: string,
    user: any
};

@Injectable()
export class AuthenticationService {  
    
  tokenKey: string = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
    
  constructor(private http: HttpClient, private router: Router, private processHttpService: ProcessHTTPService) { }
  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTToken')
    .subscribe(res => {
        console.log("JWT token Valid: ", res);
        this.sendUsername(res.user.username);
    },
    err => {
        console.log("JWT Token invalid: ", err);
        this.destroyUserCredentials();
    })
  }

  sendUsername(name: string){
      this.username.next(name);
  }
  clearUsername() {
      this.username.next(undefined);
  }
    
  loadUserCredentials() {
      let credentials = JSON.parse(localStorage.getItem(this.tokenKey));
      console.log("loadUserCredentials", credentials);
      if( credentials && credentials.username != undefined){
          this.useCredentials(credentials);
          if(this.authToken)
              this.checkJWTtoken();
      }
  }
    
  storeUserCredentials(credentials: any) {
      console.log("storeUserCredentials ", credentials );
      localStorage.setItem(this.tokenKey,JSON.stringify(credentials));
      this.useCredentials(credentials);
  }
    
  useCredentials(credentials: any) {
      this.isAuthenticated = true;
      this.sendUsername(credentials.username);
      this.authToken = credentials.token;
  }
    
  destroyUserCredentials() {
      this.authToken = undefined;
      this.clearUsername();
      this.isAuthenticated = false;
      localStorage.removeItem(this.tokenKey);
  }
    
  logIn(user: any): Observable<any> {
      return this.http.post<AuthResponse>(baseURL + 'users/login', {"username": user.username, "password": user.password})
      .map(res => {
          console.log(res);
          this.storeUserCredentials({username: user.username, user:res.user, token: res.token});
          return {'success': true, 'username': user.username};
      })
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }
  
    me(): Observable<any> {
      return this.http.get(baseURL+'users/me')
      .catch(error=> {return this.processHttpService.handleError(error);});
  }
  
  logOut() {
      this.destroyUserCredentials();
  }
    
  isLoggedIn(): Boolean {
      return this.isAuthenticated;
  }
    
  getUsername(): Observable<string> {
      return this.username.asObservable();
  }
    
  getToken(): string {
      return this.authToken;
  }
  
}

