import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AppRoutingModule } from '../app-routing.module';
import { ModuleWithProviders } from '@angular/core';

import { User } from '../models/User';
import { Property } from '../models/Property';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { AddPropertyService } from '../services/addProperty.service';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';

declare var $: any;

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit, OnDestroy {

  private propertySubscription;
  private subscriptions: Subscription[] = [];

  private propertyComps: Array<Object>;
  private newProperty: Property;
  private photo: File;
  private photos: Array<File> = [];
  private uploadedPhotos: Array<string> = [];
  private validForm: boolean = false;
  private validPhotos: boolean = false;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private addPropertyService: AddPropertyService,
              private photosService: PhotosService,
              private router: Router,
              private validateService: ValidateService) { }

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
      insurance: '',
      propertyType: 'Single Family',
      yearBuilt: '',
      status: 'Listed',
      sellerFinancing: 'no',
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

  onSubmit() {
    this.photosService.getPropertyPhotoUrls(this.uploadedPhotos, (error, photos) => {
      if (error) {
        this.alertService.error('Error uploading photo.');
        return;
      } else {
        this.newProperty.photos = photos;
        this.propertySubscription = this.addPropertyService.addProperty(this.newProperty)
          .subscribe((response) => {
            if (response.success === true) {
              this.alertService.success(response.message);
              this.router.navigate(['/dashboard']);
            }
          }, (error) => {
            this.alertService.error(error.message);
          });

        this.subscriptions.push(this.propertySubscription);
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
      this.alertService.error('Please upload an image file.');
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
        this.alertService.error('Error uploading photos. Please try again later.');
      } else {
        let inputValue = (<HTMLInputElement>document.getElementById('imageInput'));
        inputValue.value = "";
        document.getElementById('removePhotos').hidden = true;
        document.getElementById('uploadPhotos').hidden = true;
        this.uploadedPhotos = photos;
        this.photos = [];
        this.validPhotos = true;
        this.alertService.success('Successfully uploaded photo.');
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
    this.alertService.success('Photo removed.');
  }

  cancel() {
    this.uploadedPhotos.forEach((photo) => {
      this.photosService.removePropertyPhotos(photo, (error) => {
        if (error) {
          this.alertService.error('Error removing property photos.', false);
          return;
        }
      })
    })

    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
