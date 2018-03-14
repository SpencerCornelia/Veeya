import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from '../app-routing.module';
import { ModuleWithProviders } from '@angular/core';

import { User } from '../models/User';
import { Property } from '../models/Property';

import { AuthService } from '../services/auth.service';
import { AddPropertyService } from '../services/addProperty.service';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  private propertyComps: Array<Object>;
  private currentUser: User;
  private newProperty: Property;
  private photo: File;
  private photos: Array<File> = [];
  private uploadedPhotos: Array<string> = [];

  constructor(private authService: AuthService,
              private addPropertyService: AddPropertyService,
              private photosService: PhotosService,
              private router: Router,
              private validateService: ValidateService)
              {
                this.getCurrentUser();
              }

  ngOnInit() {
    document.getElementById('removePhotos').hidden = true;
    document.getElementById('uploadPhotos').hidden = true;
    let wholesalerID = this.authService.loggedInUser();
    let propertyComps = [];
    this.newProperty = {
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

    this.currentUser = {
      userType: '',
      firstName: '',
      lastName: '',
      userName: '',
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

  onSubmit() {
    this.photosService.getPropertyPhotoUrls(this.uploadedPhotos, (error, photos) => {
      if (error) {
        // error message = 'Error submitting form. Please try again.'
        return;
      } else {
        this.newProperty.photos = photos;
        this.addPropertyService.addProperty(this.newProperty)
          .subscribe((response) => {
            if (response.success === true) {
              this.router.navigate(['/dashboard']);
            }
          }, (error) => {

          });
      }
    });

  }

  addPhoto(event) {
    let file = event.target.files[0];
    let fileType = file["type"];
    if (this.validateService.validatePhotoInput(fileType)) {
      this.photo = event.target.files[0];
      this.photos.push(this.photo);
      document.getElementById('selectedFiles').innerHTML += file.name + "</br>";
      document.getElementById('removePhotos').hidden = false;
      document.getElementById('uploadPhotos').hidden = false;
    } else {
      // display an error message telling user to upload a file that is an image
    }
    if (this.photos.length === 3) {
      let inputButton = (<HTMLInputElement>document.getElementById('imageInput'));
      inputButton.disabled = true;
    }
  }

  uploadPhotos(event) {
    document.getElementById('uploadPhotos').setAttribute('disabled', 'disabled');
    this.photosService.uploadPropertyPhotos(this.photos, (error, photos) => {
      if (error) {
        // error message = 'Error uploading photos. Please try again later.'
      } else {
        let inputValue = (<HTMLInputElement>document.getElementById('imageInput'));
        inputValue.value = "";
        document.getElementById('removePhotos').hidden = true;
        document.getElementById('uploadPhotos').hidden = true;
        this.uploadedPhotos = photos;
      }
    });
  }

  removePhotos() {
    this.photos = [];
    document.getElementById('selectedFiles').innerHTML = "";
    let inputValue = (<HTMLInputElement>document.getElementById('imageInput'));
    inputValue.value = "";
    inputValue.disabled = false;
    document.getElementById('removePhotos').hidden = true;
    document.getElementById('uploadPhotos').hidden = true;
  }

}
