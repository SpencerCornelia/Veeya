import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { AddPropertyService } from '../services/addProperty.service';
import { ModuleWithProviders } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  private newProperty: Property;

  constructor(private addPropertyService: AddPropertyService, private router: Router) { }

  ngOnInit() {
    let wholesalerID = localStorage.getItem('user_id');
    this.newProperty = {
      _id: 0,
      wholesaler: wholesalerID,
      address: 'Form Address1',
      city: 'Las Vegas',
      state: 'NV',
      zipCode: 89109,
      purchasePrice: 250000,
      bedrooms: 3,
      bathrooms: 3,
      rehabCostMin: 10000,
      rehabCostMax: 20000,
      afterRepairValue: 350000,
      averageRent: 1200,
      squareFootage: 1278,
      propertyType: '4plex',
      yearBuilt: 1987,
      status: 'Under Contract',
      comps: 450000
    }
  }

  public onSubmit() {
    this.addPropertyService.addProperty(this.newProperty)
    // need to change this to be like login and register
    // follow what I did there
      .subscribe(response => {
        if (response.success === true) {
          this.router.navigate(['/properties']);
        }
      })
  }

}
