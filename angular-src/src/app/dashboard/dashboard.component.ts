import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { EditPropertyService } from '../services/editProperty.service';
import { Property } from '../models/Property';

import * as $ from 'jquery';

import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private user: any;
  private pageTitle: String;
  private properties: Property[] = [];
  private userID: String;
  private userType: String;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private editPropertyService: EditPropertyService,
              private router: Router) { }

  ngOnInit() {
    this.user = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      phoneNumber: '',
      properties: this.properties
    }
    this.userID = this.authService.loggedInUser();
    this.userType = this.authService.loggedInUserType();
    if (this.userType === 'Wholesaler') {
      this.getWholesalerProfileInfo();
    } else if (this.userType === 'Investor') {
      this.getInvestorProfileInfo();
    } else {
      this.userType = 'Lender';
    }
  }

  getWholesalerProfileInfo() {
    this.profileService.getWholesalerProfileInfo(this.userID)
      .subscribe((response) => {
        this.user = response[0];
        this.properties = response[0].properties;
      }, (error) => {

      });
  }

  getInvestorProfileInfo() {
    this.profileService.getInvestorProfileInfo(this.userID)
      .subscribe((response) => {
        this.user = response[0];
        this.properties = response[0].properties;
      }, (error) => {

      })
  }

  editProperty(property: Property) {
    this.editPropertyService.getPropertyByID(property._id)
      .subscribe((response) => {
        this.router.navigate(['/properties/editproperty/' + property._id]);
      }, (error) => {

      })
  }

}
