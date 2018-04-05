import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  user = {username: '', password: ''};
  errMess: string;
    
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
      console.log('yo');
      console.log(this.authenticationService.isLoggedIn());
      this.authenticationService.loadUserCredentials();
      if(this.authenticationService.isLoggedIn()){
          console.log(this.authenticationService.isLoggedIn());
          this.router.navigate(['home']);
      }
  }
    
  onSubmit(){
      console.log("User: ", this.user);
      this.authenticationService.logIn(this.user)
      .subscribe(res => {
          if (res.success){
              this.router.navigate(['home']);
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
