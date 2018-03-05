import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private connected: Boolean;
  private user: User;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.user = {
      userType: '',
      firstName: '',
      lastName: '',
      password: '',
      userName: '',
      email: '',
      phoneNumber: '',
      properties: [],
      minimumLoanAmount: '',
      maximumLoanAmount: '',
      connections: [],
      terms: [],
      profilePhoto: ''
    }

    let user_id = this.activatedRoute.snapshot.params['id'];
    this.getUserInfo(user_id);
    this.searchInvestorEmailUsername('scornelia@shift4.com', 'scornelia3431');
  }

  getUserInfo(userID) {
    this.userService.getUserById(userID)
      .subscribe((response) => {
        this.user = response;
        this.connected = this.isConnected();
      }, (error) => {

      })
  }

  isConnected() {
    this.user.connections.forEach((user) => {
      if (user._id === this.authService.loggedInUser()) {
        return true;
      }
    })
    return false;
  }

  searchInvestorEmailUsername(email, username) {
    this.userService.searchInvestorEmailUsername(email, username);
  }

}
