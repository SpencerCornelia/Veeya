import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AddConnectionService } from '../services/addConnection.service';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private addConnectionSubscription;
  private getUserSubscription;
  private increaseProfileViewsSubscription;

  private currentUser: string;
  private connected: Boolean = false;
  private connectionSent: Boolean = false;
  private notConnected: Boolean = true;
  private disableConnectButton: Boolean = false;
  private numberOfDeals: any = 0;
  private user: User;
  private user_id: string;

  constructor(private router: Router,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private addConnectionService: AddConnectionService) { }

  ngOnInit() {
    this.currentUser = this.authService.loggedInUser();
    this.user_id = this.activatedRoute.snapshot.params['id'];
    this.getUserInfo(this.user_id);
  }

  getUserInfo(userID) {
    this.getUserSubscription = this.userService.getUserById(userID)
      .subscribe((response) => {
        this.user = response;
        this.determineNumberOfDeals(this.user);
        this.isConnected();
      }, (error) => {
        this.alertService.error('Error retrieving user info.');
      });

    this.increaseProfileViewsSubscription = this.userService.increaseProfileViews(userID)
      .subscribe((response) => {
        this.user.profileViews = response.profileViews;
      }, (error) => {
        this.alertService.error('Error increasing profile views.');
      });
  }

  isConnected() {
    this.user.connections.forEach((user) => {
      if (user == this.currentUser) {
        this.connected = true;
        this.notConnected = false;
        return;
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
    this.addConnectionSubscription = this.addConnectionService.addConnection(this.currentUser, this.user_id)
      .subscribe((response) => {
        this.notConnected = false;
        this.connectionSent = true;
        this.disableConnectButton = true;
        this.alertService.success('Added connection successfully.', true);
      }, (error) => {
        this.alertService.error('Error adding connection.', true);
      });
  }

  determineNumberOfDeals(user) {
    if (user.userType == 'Wholesaler') {
      this.numberOfDeals = user.wholesalerSoldProperties.length;
    } else if (user.userType == 'Investor') {
      this.numberOfDeals = user.investorBoughtProperties.length;
    } else {
      this.numberOfDeals = user.lenderLoanedProperties.length;
    }
  }

  ngOnDestroy() {
    this.addConnectionSubscription.unsubscribe();
    this.getUserSubscription.unsubscribe();
    this.increaseProfileViewsSubscription.unsubscribe();
  }

}
