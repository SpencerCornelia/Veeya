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

  // array of Property type
  private properties: Property[] = [];
  private wholesalerProperties: Property[] = [];

  constructor(private getPropertyService: GetAllPropertiesService, private deletePropertyService: DeletePropertyService, private getUserPropertiesService: GetUserPropertiesService, private editPropertyService: EditPropertyService, private router: Router) { }

  ngOnInit() {
    this.getPropertiesForWholesaler();
  }

  public getPropertiesForWholesaler() {
    let wholesalerID = localStorage.getItem('user_id');
    // Get all properties for the wholesaler who is logged in
    this.getUserPropertiesService.getUserProperties(wholesalerID)
      .subscribe(response => this.wholesalerProperties = response)
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

  public onAddProperty(newProperty) {
    this.properties = this.properties.concat(newProperty);
  }

  public editProperty(property: Property) {
    this.router.navigate(['/properties/editproperty/' + property._id]);
  }

}
