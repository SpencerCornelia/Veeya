import { Component, OnInit } from '@angular/core';
import { GetAllPropertiesService } from '../services/getAllProperties.service';
import { DeletePropertyService } from '../services/deleteProperty.service';
import { Property } from '../models/Property';

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.css']
})
export class ViewPropertiesComponent implements OnInit {

  // array of Property type
  private properties: Property[] = [];

  constructor(private getPropertyService: GetAllPropertiesService, private deletePropertyService: DeletePropertyService) { }

  ngOnInit() {
    this.loadProperties();
  }

  public loadProperties() {
    // Get all properties from server and update the properties property
    this.getPropertyService.getAllProperties().subscribe(
      response => this.properties = response)
  }

  public deleteProperty(property: Property) {
    this.deletePropertyService.deleteProperty(property._id).subscribe(
      response => this.properties = this.properties.filter(properties => properties !== property))
  }

  public onAddProperty(newProperty) {
    this.properties = this.properties.concat(newProperty);
  }

}
