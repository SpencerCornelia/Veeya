import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { EditPropertyService } from '../services/editProperty.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  private propertyID: string;
  private initialProperty: Property[];

  constructor(private route: ActivatedRoute, private editPropertyService: EditPropertyService, private router: Router) {
    this.propertyID = route.snapshot.params['id'];
    this.getProperty(this.propertyID);
  }

  getProperty(id) {
    this.editPropertyService.getPropertyByID(id)
      .subscribe(response => this.initialProperty = response);

    console.log("this.initialProperty after getPropertyById call =", this.initialProperty);
  }

  ngOnInit() {

    /* Need to receive the property that was clicked from the click function
       and set the default values of the form to the values from the property
       being passed to this component
     */
    // this.initialProperty = {
    //   _id: this.currentProperty._id,
    //   wholesaler: '5a19be40ac529d148276ee90',
    //   address: this.currentProperty.address,
    //   city: this.currentProperty.city,
    //   state: this.currentProperty.state,
    //   zipCode: this.currentProperty.zipCode,
    //   purchasePrice: this.currentProperty.purchasePrice,
    //   bedrooms: this.currentProperty.bedrooms,
    //   bathrooms: this.currentProperty.bathrooms,
    //   rehabCostMin: this.currentProperty.rehabCostMin,
    //   rehabCostMax: this.currentProperty.rehabCostMax,
    //   afterRepairValue: this.currentProperty.afterRepairValue,
    //   averageRent: this.currentProperty.averageRent,
    //   squareFootage: this.currentProperty.squareFootage,
    //   propertyType: this.currentProperty.propertyType,
    //   yearBuilt: this.currentProperty.yearBuilt,
    //   status: this.currentProperty.status,
    //   comps: this.currentProperty.comps
    // }
  }

}
