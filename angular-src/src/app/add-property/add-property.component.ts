import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Property } from '../models/Property';
import { AddPropertyService } from '../services/addProperty.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  private newProperty :Property;
  @Output() addProperty: EventEmitter<Property> = new EventEmitter<Property>();

  constructor(private addPropertyService: AddPropertyService) { }

  ngOnInit() {
    this.newProperty = {
      _id: 0,
      address: '',
      city: '',
      state: '',
      zipCode: 0,
      purchasePrice: 0,
      bedrooms: 0,
      bathrooms: 0,
      rehabCostMin: 0,
      rehabCostMax: 0,
      afterRepairValue: 0,
      averageRent: 0,
      squareFootage: 0,
      propertyType: '',
      yearBuilt: 0,
      status: ''
    }
  }

  public onSubmit() {
    this.addPropertyService.addProperty(this.newProperty).subscribe(
      response => {
        if (response.success === true) {
          this.addProperty.emit(this.newProperty);
        }
      }
    )
  }

}
