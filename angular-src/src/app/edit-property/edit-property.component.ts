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

  private pageTitle: String;
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
    let wholesalerID = localStorage.getItem('user_id');
    // set initialProperty to beginning values to avoid field is undefined error in console
    this.initialProperty = {
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
      propertyType: 'singleFamily',
      yearBuilt: 1987,
      status: 'contractYes',
      comps: 450000,
      photos: ''
    }
    this.pageTitle = 'Edit Property';
  }

  getProperty(id) {
    this.editPropertyService.getPropertyByID(id)
      .subscribe((response) => {
        this.initialProperty = response.data;
      }, (error) => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      });
  }

  public onSubmit() {
    this.editPropertyService.editProperty(this.initialProperty)
      .subscribe((response) => {
        if (response.success) {
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
