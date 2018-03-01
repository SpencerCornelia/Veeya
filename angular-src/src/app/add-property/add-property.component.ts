import { Component, OnInit, Output } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { AddPropertyService } from '../services/addProperty.service';
import { ModuleWithProviders } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  private newProperty: Property;

  constructor(private addPropertyService: AddPropertyService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    let wholesalerID = localStorage.getItem('user_id');
    this.newProperty = {
      _id: 0,
      wholesaler_id: wholesalerID,
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
      propertyType: 'Single Family',
      yearBuilt: 1987,
      status: 'contractYes',
      comps: 450000,
      photos: ''
    }
  }

  public onSubmit() {
    this.addPropertyService.addProperty(this.newProperty)
      .subscribe((response) => {
        if (response.success === true) {
          this.router.navigate(['/dashboard']);
          this.flashMessage.show(response.message, {
            cssClass: 'alert-success',
            timeout: 3000
          });
        }
      }, (error) => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      });
  }

}
