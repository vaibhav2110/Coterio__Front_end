import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPService } from './process-http.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
export interface Comment{
    comment: string;
    author: string;
    date: string;
}

export interface Article{
    body: string;
    img: string;
    favoritesCount: number;
    author: any;
    comments: Comment[];
}

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient,
              private processHTTPService: ProcessHTTPService) { }
  getArticles(): Observable<Article[]> {
      return this.http.get(baseURL+'articles')
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
  post(body: string){
      return this.http.post(baseURL+'articles',body)
      .catch(error => {
          return this.processHTTPService.handleError(error);
      });
  }
  delete(id: string): Observable<Article[]> {
      return this.http.delete(baseURL+'articles/'+id)
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
    like(id: string): Observable<any> {
      return this.http.post(baseURL+'articles/'+id+'/favorite',{})
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
    unlike(id: string): Observable<any> {
      return this.http.post(baseURL+'articles/'+id+'/unfavorite',{})
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
     isLiked(id: string): Observable<any> {
      return this.http.get(baseURL+'articles/'+id+'/favorite')
      .catch(error=> {return this.processHTTPService.handleError(error);});
  }
   

}
