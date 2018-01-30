import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
// import { Routing } from '../app-routing';
import { AddPropertyService } from '../services/addProperty.service';
import { ModuleWithProviders } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  private newProperty: Property;
  @Output() addProperty: EventEmitter<Property> = new EventEmitter<Property>();

  constructor(private addPropertyService: AddPropertyService, private router: Router) { }

  ngOnInit() {
    this.newProperty = {
      _id: 0,
      wholesaler: '5a19be40ac529d148276ee90',
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
    this.addPropertyService.addProperty(this.newProperty).subscribe(
      response => {
        if (response.success === true) {
          console.log("add property in onSubmit call in add property component")
          this.addProperty.emit(this.newProperty);
          // check stack overflow posting to continue testing this
          this.router.navigate(['/properties']);
        }
      }
    )
  }

}
