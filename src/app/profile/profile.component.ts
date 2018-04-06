import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

import {ActivatedRoute, Params, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  errMess: string;
  user_id: string;
  user: any;
  me: any;
  constructor(private userService: UserService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.userService.getMe()
      .subscribe((me)=> this.me = me);
      this.route.params.switchMap((params: Params)=>{
          this.user_id = params['id'];
          console.log(this.user_id);
          return this.userService.getUser(params['id']); 
      })
      .subscribe((user)=>{
          this.user = user;
          console.log(user);
      });
      /*this.userService.getUser(user_id)
      .subscribe((user)=> this.user = user);*/
  }
    
    follow(){
        this.userService.followUser(this.user_id)
        .subscribe((user)=> {console.log(user); this.user = user;});
    }
    unfollow(){
        this.userService.unfollowUser(this.user_id)
        .subscribe((user)=> {console.log(user); this.user = user;});
    }

}
