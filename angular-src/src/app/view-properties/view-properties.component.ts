import { Component, OnInit } from '@angular/core';
import { GetAllPropertiesService } from '../services/getAllProperties.service';
import { DeletePropertyService } from '../services/deleteProperty.service';
import { GetWholesalerPropertiesService } from '../services/getWholesalerProperties.service';
import { Property } from '../models/Property';

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.css']
})
export class ViewPropertiesComponent implements OnInit {

  // array of Property type
  private properties: Property[] = [];
  private wholesalerProperties: Property[] = [];

  constructor(private getPropertyService: GetAllPropertiesService, private deletePropertyService: DeletePropertyService, private getWholesalerPropertyService: GetWholesalerPropertiesService) { }

  ngOnInit() {
    this.getPropertiesForWholesaler();
  }

  public getPropertiesForWholesaler() {
    // Get all properties for the wholesaler who is logged in
    this.getWholesalerPropertyService.getWholesalerProperties("5a19be40ac529d148276ee90")
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

}
