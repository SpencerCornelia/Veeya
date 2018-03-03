import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from '../app-routing.module';
import { ModuleWithProviders } from '@angular/core';

import { Property } from '../models/Property';

import { AddPropertyService } from '../services/addProperty.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  private newProperty: Property;
  private photo: File;
  private photos: Array<File> = [];
  private uploadedPhotos: Array<String> = [];

  constructor(private addPropertyService: AddPropertyService,
              private flashMessage: FlashMessagesService,
              private photosService: PhotosService,
              private router: Router,
              private validateService: ValidateService) { }

  ngOnInit() {
    document.getElementById('removePhotos').hidden = true;
    document.getElementById('uploadPhotos').hidden = true;
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
      photos: []
    }
  }

  public onSubmit() {
    this.photosService.getPropertyPhotoUrls(this.uploadedPhotos, (error, photos) => {
      if (error) {
        this.flashMessage.show('Error submitting form. Please try again.', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
        return;
      } else {
        this.newProperty.photos = photos;
      }
    });

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

  public addPhoto(event) {
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

  public uploadPhotos(event) {
    this.photosService.uploadPropertyPhotos(this.photos, (error, photos) => {
      if (error) {
        this.flashMessage.show('Error uploading photos. Please try again later.', {
          cssClass: 'alert-danger',
          timeout: 2000
        });
      } else {
        this.uploadedPhotos = photos;
      }
    });
  }

  public removePhotos() {
    this.photos = [];
    document.getElementById('selectedFiles').innerHTML = "";
    let inputValue = (<HTMLInputElement>document.getElementById('imageInput'));
    inputValue.value = "";
    inputValue.disabled = false;
  }

}
