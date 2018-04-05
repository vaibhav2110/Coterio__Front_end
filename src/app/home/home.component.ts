import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ArticleService } from '../services/article.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { FormsModule }   from '@angular/forms';

export interface Comment{
    comment: string;
    author: string;
    date: string;
}

export interface Article{
    mine: boolean;
    body: string;
    img: string;
    favoritesCount: number;
    author: any;
    comments: Comment[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
    
  @ViewChild('aform') articleFormDirective;
  isLiked: boolean;
  text: string = 'Like';
  articles: Article[];
  errMess: string;
  username: string = undefined;
  user: any;
  subscription: Subscription;
    
    
formErrors = {
    'body': ''
  };

  validationMessages = {
    'body': {
      'required':      'Body is required.'
    }
  };
    
  articleForm: FormGroup;
  constructor(private articleService: ArticleService,
              @Inject('BaseURL') private BaseURL,
              private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
      /*let credentials = JSON.parse(localStorage.getItem('JWT'));
      console.log(credentials);
      this.user = credentials.user;
      console.log(this.user);*/
      this.authService.me()
      .subscribe((user)=> this.user = user);
      this.subscription = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
      this.createForm();
      this.getArt();
     
  }
 getArt(){
      this.articleService.getArticles()
      .subscribe(articles => {console.log(articles['docs']);
                                 this.articles = articles['docs'];
                             },
                errmess => this.errMess = <any>errmess);
      
 }
  
  createForm(){
      this.articleForm = this.fb.group({
          body: ['', Validators.required]
      });
      this.articleForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      
      this.onValueChanged();
  }

  onSubmit(){
      console.log(this.articleForm.value);
        this.articleService.post( this.articleForm.value)
          .subscribe(article => {this.getArt();console.log(article);});
        this.articleForm.reset({
          body: ''
        });
        this.articleFormDirective.resetForm();
      }
  
  logOut() {
      this.authService.logOut();
      this.router.navigate(['menu']);
  }

  deletes(article_id: string){
      this.articleService.delete(article_id).subscribe(article => {console.log(article); this.getArt()});
  }
  like(article_id: string){
      this.articleService.isLiked(article_id)
      .subscribe(res=> { this.isLiked = res.success;
      console.log(this.isLiked);
      if(this.isLiked){
          this.articleService.unlike(article_id).subscribe(favorites => {console.log('Unliked '+article_id);this.user.favorites = favorites;console.log(this.user.favorites.indexOf(article_id));});
          this.text = 'Like';
      }
      else{
          this.articleService.like(article_id).subscribe(favorites => {console.log('Liked '+article_id);this.user.favorites = favorites;console.log(this.user.favorites.indexOf(article_id));});
          this.text = 'Unlike';
      }
                       });
      
      
  }
  open(author_id){
      if(author_id == this.user._id){
          this.router.navigate(['me']);
      }
      else{
          this.router.navigate(['profile', {p1: author_id}]);
      }
  }

  onValueChanged(data?: any) {
    if (!this.articleForm) { return; }
    const form = this.articleForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
