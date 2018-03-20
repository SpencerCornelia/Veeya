import { Component, OnInit } from '@angular/core';

import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { AddConnectionService } from '../services/addConnection.service';
import { GetConnectionsService } from '../services/getConnections.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  private connections: Array<User> = [];

  private pendingConnections: Boolean = false;

  private pendingConnectionsArray: Array<User> = [];
  private searchText: String;
  private user_id: String;

  constructor(private addConnectionService: AddConnectionService,
              private authService: AuthService,
              private getConnectionsService: GetConnectionsService,
              private userService: UserService) { }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.getConnectionsForUser();
    this.getPendingConnections();
  }

  getConnectionsForUser() {
    this.getConnectionsService.getConnectionsForUser(this.user_id)
      .subscribe((response) => {
        this.connections = response;
      }, (error) => {

      });
  }

  getPendingConnections() {
    this.getConnectionsService.getPendingConnections(this.user_id)
      .subscribe((response) => {
        this.pendingConnectionsArray = response;
        if (this.pendingConnectionsArray.length > 0) {
          this.pendingConnections = true;
        }
      }, (error) => {

      });
  }

  acceptRequest(connection) {
    let connectionId = connection._id;
    this.addConnectionService.acceptConnection(this.user_id, connectionId)
      .subscribe((response) => {
        this.connections.push(response.connectionUser);
        if (this.pendingConnectionsArray.length == 1) {
          this.pendingConnections = false;
          this.pendingConnectionsArray = [];
        } else {
          this.pendingConnectionsArray.filter((connection) => {
            return connection._id != response.connectionUser._id;
          });
        }
      }, (error) => {

      })
  }

  denyRequest(connection) {
    let connectionId = connection._id;
    this.addConnectionService.denyConnection(this.user_id, connectionId)
      .subscribe((response) => {
        if (this.pendingConnectionsArray.length == 1) {
          this.pendingConnections = false;
          this.pendingConnectionsArray = [];
        } else {
          this.pendingConnectionsArray.filter((connection) => {
            return connection._id != response.connectionUser._id;
          });
        }
      }, (error) => {

      })
  }

}
