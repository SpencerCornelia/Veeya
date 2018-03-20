import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

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
export class DashboardComponent implements OnInit {

  private currentUser: User;
  private pageTitle: String;
  private properties: Property[] = [];
  private userID: String;
  private userType: String;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private editPropertyService: EditPropertyService,
              private router: Router)
              {
                this.getCurrentUser();
              }

  ngOnInit() {
    this.currentUser = {
      userType: '',
      firstName: '',
      lastName: '',
      userName: '',
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

    // this.userID = this.authService.loggedInUser();
    // this.userType = this.authService.loggedInUserType();
    // if (this.userType === 'Wholesaler') {
    //   this.getWholesalerProfileInfo();
    // } else if (this.userType === 'Investor') {
    //   this.getInvestorProfileInfo();
    // } else {
    //   this.userType = 'Lender';
    // }
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  // getWholesalerProfileInfo() {
  //   this.profileService.getWholesalerProfileInfo(this.userID)
  //     .subscribe((response) => {
  //       this.currentUser = response[0];
  //       this.properties = response[0].properties;
  //     }, (error) => {

  //     });
  // }

  // getInvestorProfileInfo() {
  //   this.profileService.getInvestorProfileInfo(this.userID)
  //     .subscribe((response) => {
  //       this.currentUser = response[0];
  //       this.properties = response[0].properties;
  //     }, (error) => {

  //     })
  // }

}
