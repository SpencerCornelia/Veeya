import { Component, OnInit } from '@angular/core';

import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { GetConnectionsService } from '../services/getConnections.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  private connections: Array<User> = [];
  private currentUser: User;
  private searchText: String;
  private user_id: String;

  constructor(private authService: AuthService,
              private getConnectionsService: GetConnectionsService,
              private userService: UserService)
              {
                this.getCurrentUser();
              }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.getConnectionsForUser();

    this.currentUser = {
      userType: '',
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: '',
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      }
    }
  }

  getConnectionsForUser() {
    this.getConnectionsService.getConnectionsForUser(this.user_id)
      .subscribe((response) => {
        this.connections = response;
      }, (error) => {

      });
  }

  getCurrentUser() {
    this.authService.getCurrentUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

}
