import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { EditPropertyService } from '../services/editProperty.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  private propertyID: string;
  private initialProperty: any;

  constructor(private route: ActivatedRoute,
              private editPropertyService: EditPropertyService,
              private router: Router,
              private flashMessage: FlashMessagesService
              ) {
    this.propertyID = route.snapshot.params['id'];
    this.getProperty(this.propertyID);
  }

  ngOnInit() {
    // set initialProperty to beginning values to avoid field is undefined error in console
    this.initialProperty = {
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

  getProperty(id) {
    this.editPropertyService.getPropertyByID(id)
    // edit this to be like login and register
    // for handling 500 errors
      .subscribe((data) => {
        this.initialProperty = data.property;
      });
  }

  public onSubmit() {
    // edit this to be like login and register
    // for handling 500 errors
    this.editPropertyService.editProperty(this.initialProperty)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/properties']);
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
