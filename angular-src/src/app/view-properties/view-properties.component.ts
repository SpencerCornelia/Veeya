import { Component, OnInit } from '@angular/core';
import { GetAllPropertiesService } from '../services/getAllProperties.service';
import { DeletePropertyService } from '../services/deleteProperty.service';
import { GetUserPropertiesService } from '../services/getUserProperties.service';
import { EditPropertyService } from '../services/editProperty.service'
import { Property } from '../models/Property';

import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.css']
})
export class ViewPropertiesComponent implements OnInit {

  private properties: Property[] = [];

  private wholesalerPropertiesListed: Property[] = [];
  private wholesalerPropertiesSold: Property[] = [];

  private investorPropertiesBought: Property[] = [];
  private investorPropertiesConnected: Property[] = [];
  private investorPropertiesStarred: Property[] = [];

  constructor(private getPropertyService: GetAllPropertiesService, private deletePropertyService: DeletePropertyService, private getUserPropertiesService: GetUserPropertiesService, private editPropertyService: EditPropertyService, private router: Router) { }

  ngOnInit() {
    let userType = localStorage.getItem('user_type');
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
  }

  public getPropertiesForWholesaler() {
    let wholesalerID = localStorage.getItem('user_id');
    // Get all properties for the wholesaler who is logged in
    this.getUserPropertiesService.getWholesalerUserProperties(wholesalerID)
      .subscribe(response => this.properties = response)
  }

  public getPropertiesForInvestor() {
    let investorID = localStorage.getItem('user_id');
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
