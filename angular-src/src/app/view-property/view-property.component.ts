import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/User';

import { AuthService } from '../services/auth.service';
import { EditPropertyService } from '../services/editProperty.service';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';
import { ViewPropertyService } from '../services/viewProperty.service';


@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {

  private currentUser: User;
  private pageTitle: String;
  private photo: File;
  private testPhotos: Array<String> = [];
  private photos: Array<String> = [];
  private propertyID: string;
  private initialProperty: Property;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private viewPropertyService: ViewPropertyService,
              private router: Router,
              private photosService: PhotosService,
              private validateService: ValidateService) {
    this.getCurrentUser();
    this.propertyID = route.snapshot.params['id'];
    this.getProperty(this.propertyID);
  }

  ngOnInit() {
    this.initialProperty = {
      _id: 0,
      wholesaler_id: '0',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      purchasePrice: '',
      bedrooms: 0,
      bathrooms: 0,
      expectedRehab: '',
      afterRepairValue: '',
      HOA: '',
      propertyTaxes: '',
      utilities: '',
      capRate: '',
      averageRent: '',
      squareFootage: '',
      propertyType: '',
      yearBuilt: '',
      status: '',
      comps: [
        {
          firstCompAddress: '',
          firstCompPrice: ''
        },
        {
          secondCompAddress: '',
          secondCompPrice: ''
        },
        {
          thirdCompAddress: '',
          thirdCompPrice: ''
        }
      ],
      photos: []
    }

    this.currentUser = {
      userType: '',
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: '',
      URLs: {}
    }
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  getProperty(id) {
    this.viewPropertyService.getPropertyById(id)
      .subscribe((response) => {
        this.initialProperty = response;
        this.photos = this.initialProperty.photos;
      }, (error) => {

      });
  }
}

