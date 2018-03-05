import { Component, OnInit } from '@angular/core';

import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private user: User;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    let user_id = this.authService.loggedInUser();
    this.getUser(user_id);

    this.user = {
      userType: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: ''
    }
  }

  getUser(user_id) {
    this.userService.getUserById(user_id)
      .subscribe((response) => {
        this.user = response;
      }, (error) => {

      })

  }

}
