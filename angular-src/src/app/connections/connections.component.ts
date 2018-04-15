import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../models/User';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { AddConnectionService } from '../services/addConnection.service';
import { GetConnectionsService } from '../services/getConnections.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit, OnDestroy {

  private acceptConnectionSubscription;
  private denyConnectionSubscription;
  private getConnectionsSubscription;
  private getPendingConnectionsSubscription;
  private subscription: Subscription[] = [];

  private connections: Array<User> = [];
  private pendingConnections: Boolean = false;
  private pendingConnectionsArray: Array<User> = [];
  private searchText: String;
  private user_id: String;

  constructor(private addConnectionService: AddConnectionService,
              private alertService: AlertService,
              private authService: AuthService,
              private getConnectionsService: GetConnectionsService,
              private userService: UserService) { }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.getConnectionsForUser();
    this.getPendingConnections();
  }

  getConnectionsForUser() {
    this.getConnectionsSubscription = this.getConnectionsService.getConnectionsForUser(this.user_id)
      .subscribe((response) => {
        this.connections = response;
      }, (error) => {

      });

    this.subscription.push(this.getConnectionsSubscription);
  }

  getPendingConnections() {
    this.getPendingConnectionsSubscription = this.getConnectionsService.getPendingConnections(this.user_id)
      .subscribe((response) => {
        this.pendingConnectionsArray = response;
        if (this.pendingConnectionsArray.length > 0) {
          this.pendingConnections = true;
        }
      }, (error) => {
        this.alertService.error('Error with retrieving pending connections.');
      });

    this.subscription.push(this.getPendingConnectionsSubscription);
  }

  acceptRequest(connection) {
    let connectionId = connection._id;
    this.acceptConnectionSubscription = this.addConnectionService.acceptConnection(this.user_id, connectionId)
      .subscribe((response) => {
        this.connections.push(response.connectionUser);
        if (this.pendingConnectionsArray.length == 1) {
          this.pendingConnections = false;
          this.pendingConnectionsArray = [];
        } else {
          this.pendingConnectionsArray = this.pendingConnectionsArray.filter((connection) => {
            return connection._id != response.connectionUser._id;
          });
        }
      }, (error) => {
        this.alertService.error('Error accepting connection request.');
      });

    this.subscription.push(this.acceptConnectionSubscription);
  }

  denyRequest(connection) {
    let connectionId = connection._id;
    this.denyConnectionSubscription = this.addConnectionService.denyConnection(this.user_id, connectionId)
      .subscribe((response) => {
        if (this.pendingConnectionsArray.length == 1) {
          this.pendingConnections = false;
          this.pendingConnectionsArray = [];
        } else {
          this.pendingConnectionsArray = this.pendingConnectionsArray.filter((connection) => {
            return connection._id != response.connectionUser._id;
          });
        }
      }, (error) => {
        this.alertService.error('Error denying connection request.');
      });

    this.subscription.push(this.denyConnectionSubscription);
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
