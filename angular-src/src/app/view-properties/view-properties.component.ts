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

  private wholesalerPropertiesListed: Property[] = [];
  private wholesalerPropertiesSold: Property[] = [];

  private investorPropertiesBought: Property[] = [];
  private investorPropertiesConnected: Property[] = [];
  private investorPropertiesStarred: Property[] = [];

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

      this.properties.forEach((property, index) => {
        if (property.status === 'Listed') {
          this.wholesalerPropertiesListed.push(property);
        } else if (property.status === 'Sold') {
          this.wholesalerPropertiesSold.push(property);
        }
      });

    } else if (userType === 'Investor') {
      this.getPropertiesForInvestor();

      this.properties.forEach((property, index) => {
        if (property.status === 'Bought') {
          this.investorPropertiesBought.push(property);
        } else if (property.status === 'Connection') {
          this.investorPropertiesConnected.push(property);
        } else if (property.status === 'Starred') {
          this.investorPropertiesStarred.push(property);
        }
      });

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
      URLs: ''
    }
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  public getPropertiesForWholesaler() {
    let wholesalerID = this.authService.loggedInUser();
    // Get all properties for the wholesaler who is logged in
    this.getUserPropertiesService.getWholesalerUserProperties(wholesalerID)
      .subscribe(response => this.properties = response)
  }

  viewProperty(property) {
    console.log("property:", property)
    let propertyId = property.id;
    this.router.navigate(['/properties/property/', propertyId]);
  }

  public getPropertiesForInvestor() {
    let investorID = this.authService.loggedInUser();
    this.getUserPropertiesService.getInvestorUserProperties(investorID)
      .subscribe(response => this.properties = response)
  }

  public loadAllProperties() {
    // Get all properties from server and update the properties property
    this.getPropertyService.getAllProperties()
      .subscribe(response => this.properties = response)
  }

  public deleteProperty(property: Property) {
    this.deletePropertyService.deleteProperty(property._id)
      .subscribe(response => this.properties = this.properties.filter(properties => properties !== property))
  }

}
