import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { EditPropertyService } from '../services/editProperty.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';
import { ViewPropertyService } from '../services/viewProperty.service';


@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {

  private pageTitle: String;
  private photo: File;
  private testPhotos: Array<String> = [];
  private photos: Array<String> = [];
  private propertyID: string;
  private initialProperty: Property;

  constructor(private route: ActivatedRoute,
              private viewPropertyService: ViewPropertyService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private photosService: PhotosService,
              private validateService: ValidateService) {
    this.propertyID = route.snapshot.params['id'];
    console.log(this.propertyID);
    this.getProperty(this.propertyID);
  }

  ngOnInit() {
    this.initialProperty = {
      _id: 0,
      wholesaler_id: '0',
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
      photos: []
    }
  }

  getProperty(id) {
    this.viewPropertyService.getPropertyById(id)
      .subscribe((response) => {
        this.initialProperty = response;
        this.photos = this.initialProperty.photos;
      }, (error) => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      });
  }
}

