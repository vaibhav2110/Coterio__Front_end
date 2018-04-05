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
  constructor(private userService: UserService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.switchMap((params: Params)=>{
          return this.userService.getUser(params['id']); 
      })
      .subscribe((user)=>{
          this.user = user;
          console.log(user);
      })
      /*this.userService.getUser(user_id)
      .subscribe((user)=> this.user = user);*/
  }

}
