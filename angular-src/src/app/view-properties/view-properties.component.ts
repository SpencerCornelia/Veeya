import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GetAllPropertiesService } from '../services/getAllProperties.service';
import { DeletePropertyService } from '../services/deleteProperty.service';
import { GetUserPropertiesService } from '../services/getUserProperties.service';
import { EditPropertyService } from '../services/editProperty.service'
import { Property } from '../models/Property';
import { User } from '../models/User';

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.css']
})
export class ViewPropertiesComponent implements OnInit {

  private currentUser: User;
  private properties: Property[] = [];

  private investorPropertiesBought: Property[] = [];
  private investorPropertiesConnected: Property[] = [];
  private investorPropertiesStarred: Property[] = [];

  private lenderPropertiesBought: Property[] = [];
  private lenderPropertiesConnected: Property[] = [];

  private wholesalerPropertiesListed: Property[] = [];
  private wholesalerPropertiesSold: Property[] = [];

  constructor(private authService: AuthService,
              private getPropertyService: GetAllPropertiesService,
              private deletePropertyService: DeletePropertyService,
              private getUserPropertiesService: GetUserPropertiesService,
              private editPropertyService: EditPropertyService,
              private router: Router)
              {
                this.getCurrentUser();
              }

  ngOnInit() {
    let userType = this.authService.loggedInUserType();
    if (userType === 'Wholesaler') {
      this.getPropertiesForWholesaler();
    } else if (userType === 'Investor') {
      this.getPropertiesForInvestor();
    } else {
      this.getPropertiesForLender();
    }

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
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  getPropertiesForWholesaler() {
    let wholesalerID = this.authService.loggedInUser();
    // Get all properties for the wholesaler who is logged in
    this.getUserPropertiesService.getWholesalerUserProperties(wholesalerID)
      .subscribe((response) => {
        response.forEach((property) => {
          if (property.status === 'Listed') {
            this.wholesalerPropertiesListed.push(property);
          } else if (property.status === 'Sold') {
            this.wholesalerPropertiesSold.push(property);
          }
        });
      }, (error) => {

      })
  }

  viewProperty(property) {
    let propertyId = property.id;
    this.router.navigate(['/properties/property/', propertyId]);
  }

  getPropertiesForInvestor() {
    let investorID = this.authService.loggedInUser();
    this.getUserPropertiesService.getInvestorUserProperties(investorID)
      .subscribe((response) => {
        response.forEach((property) => {
          if (property.status === 'Bought') {
            this.investorPropertiesBought.push(property);
          } else if (property.status === 'Connection') {
            this.investorPropertiesConnected.push(property);
          } else if (property.status === 'Starred') {
            this.investorPropertiesStarred.push(property);
          }
        });
      }, (error) => {

      })
  }

  getPropertiesForLender() {
    let lenderID = this.authService.loggedInUser();
    this.getUserPropertiesService.getLenderUserProperties(lenderID)
      .subscribe((response) => {
        response.forEach((property) => {
          if (property.status === 'Connection') {
            this.lenderPropertiesConnected.push(property);
          } else if (property.status === 'Bought') {
            this.lenderPropertiesBought.push(property);
          }
        });
      }, (error) => {

      });
  }

}
