import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user = {username: '', password: ''};
  errMess: string;
    
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
      
  }
    
    onSubmit(){
      console.log("User: ", this.user);
      this.authenticationService.signIn(this.user)
      .subscribe(res => {
          if (res.success){
              this.router.navigate(['menu']);
          }
          else {
              console.log(res);
          }
      },
      error => {
          console.log(error);
          this.errMess = error;
      });
  }
}
