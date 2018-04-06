import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  errMess: string;
  user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
      this.userService.getMe()
      .subscribe((me)=> {this.user = me; console.log(this.user)});
  }

}
