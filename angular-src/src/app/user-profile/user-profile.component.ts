import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AddConnectionService } from '../services/addConnection.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private currentUser: string;
  private connected: Boolean = false;
  private connectionSent: Boolean = false;
  private notConnected: Boolean = true;
  private disableConnectButton: Boolean = false;
  private user: User;
  private user_id: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private addConnectionService: AddConnectionService) { }

  ngOnInit() {
    this.user = {
      userType: '',
      firstName: '',
      lastName: '',
      password: '',
      userName: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: '',
      properties: [],
      minimumLoanAmount: '',
      maximumLoanAmount: '',
      connections: [],
      terms: [],
      profilePhoto: '',
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      },
      pendingOutgoingConnectionRequests: []
    }

    this.currentUser = this.authService.loggedInUser();
    this.user_id = this.activatedRoute.snapshot.params['id'];
    this.getUserInfo(this.user_id);
  }

  getUserInfo(userID) {
    this.userService.getUserById(userID)
      .subscribe((response) => {
        this.user = response;
        this.isConnected();
      }, (error) => {

      })

    this.userService.increaseProfileViews(userID)
      .subscribe((response) => {
        this.user.profileViews = response.profileViews;
      }, (error) => {

      });
  }

  isConnected() {
    this.user.connections.forEach((user) => {
      if (this.user_id === this.authService.loggedInUser()) {
        this.connected = true;
        this.notConnected = false;
      }
    });
    this.user.pendingIncomingConnectionRequests.forEach((userId) => {
      if (userId === this.currentUser) {
        this.connectionSent = true;
        this.disableConnectButton = true;
        this.notConnected = false;
      }
    });
  }

  connect() {
    this.addConnectionService.addConnection(this.currentUser, this.user_id)
      .subscribe((response) => {
        this.notConnected = false;
        this.connectionSent = true;
        this.disableConnectButton = true;
      }, (error) => {

      });
  }

}
