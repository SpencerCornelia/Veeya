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

  private currentUser: User;
  private edit: Boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.currentUser = {
      userType: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      city: '',
      state: '',
      connections: [],
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      }
    }
  }

  onSubmit() {
    this.userService.updateUserProfile(this.currentUser)
      .subscribe((response) => {
        this.currentUser = response;
      }, (error) => {

      });
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  isDisabled() {
    return !this.edit;
  }

  editProfile() {
    this.edit = !this.edit;
  }

  addProfileImage() {
    console.log("here")
  }

}
