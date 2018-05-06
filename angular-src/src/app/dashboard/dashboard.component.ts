import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { EditPropertyService } from '../services/editProperty.service';
import { GetConnectionsService } from '../services/getConnections.service';
import { ProfileService } from '../services/profile.service';

import { Property } from '../models/Property';
import { User } from '../models/User';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private dashboardServiceSubscription;
  private getCurrentUserSubscription;
  private getPendingConnectionsSubscription;
  private subscriptions: Subscription[] = [];

  private currentUser: User;
  private data: any;
  private pageTitle: String;
  private properties: Property[] = [];
  private userID: String;
  private userType: String;

  private view = [1000,500];

  multi: any[] = [
  {
    name: 'Cyan',
    series: [
      {
        name: 5,
        value: 2650
      },
      {
        name: 10,
        value: 2800      },
      {
        name: 15,
        value: 2000
      }
    ]
  },
  {
    name: 'Yellow',
    series: [
      {
        name: 5,
        value: 2500
      },
      {
        name: 10,
        value: 3100
      },
      {
        name: 15,
        value: 2350
      }
    ]
  }
];

colorScheme: string = 'cool';
schemeType: string = 'ordinal';

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private dashboardService: DashboardService,
              private editPropertyService: EditPropertyService,
              private getConnectionsService: GetConnectionsService,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getDashboardData();
  }

  getCurrentUser() {
    this.getCurrentUserSubscription = this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {
        this.alertService.error('Error retrieving logged in user.');
      });

    this.subscriptions.push(this.getCurrentUserSubscription);
  }

  getDashboardData() {
    this.dashboardServiceSubscription = this.dashboardService.getData()
      .subscribe((response) => {
        // this.data = response;
        console.log("response to getData:", response)
      }, (error) => {

      });

    this.subscriptions.push(this.dashboardServiceSubscription);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
