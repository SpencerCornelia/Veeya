import { Component, OnInit, Input } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { Property } from '../models/Property';
import { User } from '../models/User';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { CustomizePropertyService } from '../services/customizeProperty.service';
import { DeletePropertyService } from '../services/deleteProperty.service';
import { EditPropertyService } from '../services/editProperty.service';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';
import { ViewPropertyService } from '../services/viewProperty.service';

declare var $: any;

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {

  private currentUserType: string;
  private editMode: Boolean = false;
  private enlargedPhoto: string;
  private photo: File;
  private photosToAdd: Array<File> = [];
  private propertyID: string;
  private propertyOwner: Boolean;
  private property: Property;
  private photoURLsAdded: Array<string> = [];
  private showUploadPhotosButton: Boolean = false;
  private showRemovePhotosButton: Boolean = false;

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService,
              private customizePropertyService: CustomizePropertyService,
              private deletePropertyService: DeletePropertyService,
              private editPropertyService: EditPropertyService,
              private viewPropertyService: ViewPropertyService,
              private router: Router,
              private photosService: PhotosService,
              private validateService: ValidateService) { }

  ngOnInit() {
    this.currentUserType = this.authService.loggedInUserType();
    this.propertyID = this.route.snapshot.params['id'];
    this.getProperty(this.propertyID);

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
      photos: ['']
    }

  }

  getProperty(id) {
    this.viewPropertyService.getPropertyById(id)
      .subscribe((response) => {
        this.property = response;
        this.propertyOwner = this.confirmPropertyOwnership();
      }, (error) => {
        this.alertService.error('Error retrieving property.');
      });
  }

  confirmPropertyOwnership() {
    return this.property.wholesaler_id === this.authService.loggedInUser() ? true : false;
  }

  addPhoto(event) {
    let file = event.target.files[0];
    let fileType = file["type"];
    if (this.validateService.validatePhotoInput(fileType)) {
      this.photo = event.target.files[0];
      this.photosToAdd.push(this.photo);
      document.getElementById('selectedFiles').innerHTML += file.name + "</br>";
      this.showRemovePhotosButton = true;
      this.showUploadPhotosButton = true;

      if (this.property.photos.length + this.photosToAdd.length === 3) {
        let inputButton = (<HTMLInputElement>document.getElementById('imageInput'));
        inputButton.disabled = true;
      }
    } else {
      this.alertService.error('Please add a valid photo image.');
    }

  }

  uploadPhotos(event) {
    document.getElementById('uploadPhotos').setAttribute('disabled', 'disabled');
    document.getElementById('removePhotos').setAttribute('disabled', 'disabled');
    this.photosService.uploadPropertyPhotos(this.photosToAdd, (error, photosUploaded) => {
      if (error) {

      } else {
        let inputValue = (<HTMLInputElement>document.getElementById('imageInput'));
        inputValue.value = "";

        this.showRemovePhotosButton = false;
        this.showUploadPhotosButton = false;

        this.photosToAdd = [];

        photosUploaded.forEach((photo) => {
          this.photoURLsAdded.push(photo);
        });

        document.getElementById("selectedFiles").innerHTML = '';

        this.photosService.getPropertyPhotoUrls(photosUploaded, (error, photos) => {
          if (error) {
            this.alertService.error('Error uploading photos.');
            return;
          } else {
            photos.forEach((photo) => {
              this.property.photos.push(photo);
            });
          }
        });
      }
    })
  }

  removePhoto(photo) {
    this.photosService.removePropertyPhoto(photo, (error) => {
      if (error) {
        this.alertService.error('Error removing photo. Please try again.');
      } else {
        this.alertService.error('Successfully removed photo.');
      }
    });
  }

  onSubmit() {
    this.editPropertyService.editProperty(this.property)
      .subscribe((response) => {
        if (response.success) {
          this.alertService.success('Changes saved.');
          this.router.navigate(['/dashboard']);
       }
      }, (error) => {
        this.alertService.error('Error editing property.');
      });
  }

  edit() {
    this.editMode = true;
  }

  imageModal(photo) {
    this.enlargedPhoto = photo;
    $("#photoModal").modal('show');
  }

  sold() {
    let soldConfirm = confirm("Are you sure you want to mark this property as sold?");
    if (soldConfirm) {
      this.viewPropertyService.setSoldProperty(this.property);
      this.router.navigate(['/soldproperty/', this.property._id]);
    }
  }

  listed() {
    let listedConfirm = confirm("Are you sure you want to mark this property as listed?");
    if (listedConfirm) {
      this.property.status = "Listed";
      this.editPropertyService.editProperty(this.property)
        .subscribe((response) => {
          if (response.success) {
          }
        }, (error) => {
          this.alertService.error('Error marking property as listed.', true);
        });
    }
  }

  cancel() {
    this.deletePropertyService.removePhotos(this.photoURLsAdded);
    this.editMode = false;
  }

  deleteProperty() {
    let deleteConfirm = confirm("Are you sure you want to delete this property?");
    if (deleteConfirm) {
      this.deletePropertyService.removePhotos(this.property.photos);
      this.deletePropertyService.deleteProperty(this.property._id)
        .subscribe((response) => {
          if (response.success) {
            this.alertService.success('Deleted property successfully.');
            this.router.navigate(['/dashboard']);
          }
        },(error) => {
          this.alertService.error('Error deleting property.', true);
        });
    }
  }

  customizeProperty() {
    this.customizePropertyService.setProperty(this.property);
    this.router.navigate(['/customizeproperty/', this.property._id]);
  }
}

