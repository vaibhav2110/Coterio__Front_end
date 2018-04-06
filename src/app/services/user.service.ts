import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPService } from './process-http.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private processHTTPService: ProcessHTTPService) { }
    
  getUser(id: string): Observable<any>{
      return this.http.get(baseURL+'users/'+id)
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
  getMe(): Observable<any>{
      return this.http.get(baseURL+'users/me')
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
  followUser(id: string): Observable<any>{
      return this.http.post(baseURL+'users/'+id+'/follow',{})
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
  unfollowUser(id: string): Observable<any>{
      return this.http.post(baseURL+'users/'+id+'/unfollow',{})
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
  

}
