import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { EditPropertyService } from '../services/editProperty.service';
import { Property } from '../models/Property';

import * as $ from 'jquery';

import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private user: any;
  private properties: Property[] = [];
  private userID: String;
  private userType: String;

  constructor(private profileService: ProfileService,
              private flashMessageService: FlashMessagesService,
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
    this.userID = localStorage.getItem('user_id');
    this.userType = localStorage.getItem('user_type');
    if (this.userType === 'Wholesaler') {
      this.getWholesalerProfileInfo();
    } else if (this.userType === 'Investor') {
      this.getInvestorProfileInfo();
    } else {
      console.log("this.userType is not available.");
    }
  }

  ngAfterViewInit() {

  }

  getWholesalerProfileInfo() {
    this.profileService.getWholesalerProfileInfo(this.userID)
      .subscribe((response) => {
        console.log("response:", response)
        this.user = response[0];
        this.properties = response[0].properties;
        console.log("this.properties:", this.properties)
      }, (error) => {
        this.flashMessageService.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        })
      });
  }

  getInvestorProfileInfo() {
    this.profileService.getInvestorProfileInfo(this.userID)
      .subscribe((response) => {
        this.user = response[0];
        this.properties = response[0].properties;
      }, (error) => {
        this.flashMessageService.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        })
      })
  }

  editProperty(property: Property) {
    this.editPropertyService.getPropertyByID(property._id)
      .subscribe((response) => {
        this.router.navigate(['/properties/editproperty/' + property._id]);
      }, (error) => {
        this.flashMessageService.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        })
      })
  }

}
