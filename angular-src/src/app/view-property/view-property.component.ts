import { Component, OnInit, Input } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { Property } from '../models/Property';
import { User } from '../models/User';

import { AuthService } from '../services/auth.service';
import { EditPropertyService } from '../services/editProperty.service';
import { PhotosService } from '../services/photos.service';
import { TogglePropertyService } from '../services/toggleProperty.service';
import { ValidateService } from '../services/validate.service';
import { ViewPropertyService } from '../services/viewProperty.service';


@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {

  private currentUser: User;
  private photo: File;
  private propertyID: string;
  private propertyOwner: Boolean;
  private property: Property;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private viewPropertyService: ViewPropertyService,
              private router: Router,
              private photosService: PhotosService,
              private togglePropertyService: TogglePropertyService,
              private validateService: ValidateService) {
    this.getCurrentUser();
    this.propertyID = route.snapshot.params['id'];
    this.getProperty();
  }

  ngOnInit() {
    this.propertyOwner = this.confirmPropertyOwnership();
    let wholesalerID = this.authService.loggedInUser();

    this.property = {
      _id: 0,
      wholesaler_id: wholesalerID,
      address: '',
      city: '',
      state: 'AL',
      zipCode: '',
      purchasePrice: '',
      bedrooms: 0,
      bathrooms: 0,
      expectedRehab: '',
      HOA: '',
      propertyTaxes: '',
      utilities: '',
      afterRepairValue: '',
      capRate: '',
      averageRent: '',
      squareFootage: '',
      insurance: '',
      propertyType: 'Single Family',
      yearBuilt: '',
      status: 'Listed',
      sellerFinancing: 'false',
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
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  getProperty() {
    this.viewPropertyService.getProperty()
      .subscribe((response) => {
        this.property = response;
      }, (error) => {

      });
  }

  confirmPropertyOwnership() {
    return this.property.wholesaler_id === this.authService.loggedInUser() ? true : false;
  }
}

