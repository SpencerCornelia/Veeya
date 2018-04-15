import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { EditPropertyService } from '../services/editProperty.service';

import { Property } from '../models/Property';
import { User } from '../models/User';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private getCurrentUserSubscription;

  private currentUser: User;
  private pageTitle: String;
  private properties: Property[] = [];
  private userID: String;
  private userType: String;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private profileService: ProfileService,
              private editPropertyService: EditPropertyService,
              private router: Router)
              {

              }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.getCurrentUserSubscription = this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {
        this.alertService.error('Error retrieving logged in user.');
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.getCurrentUserSubscription.unsubscribe();
  }

}
