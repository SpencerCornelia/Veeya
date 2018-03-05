import { Component, OnInit } from '@angular/core';

import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { GetConnectionsService } from '../services/getConnections.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  private connections: Array<User> = [];
  private searchText: String;
  private user_id: String;

  constructor(private authService: AuthService,
              private flashMessagesService: FlashMessagesService,
              private getConnectionsService: GetConnectionsService,
              private userService: UserService) { }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.getConnectionsForUser();
  }

  getConnectionsForUser() {
    this.getConnectionsService.getConnectionsForUser(this.user_id)
      .subscribe((response) => {
        this.connections = response;
      }, (error) => {
        this.flashMessagesService.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        })
      });
  }

}
