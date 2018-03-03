import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { EditPropertyService } from '../services/editProperty.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  private pageTitle: String;
  private photo: File;
  private testPhotos: Array<String> = [];
  private photos: Array<String> = [];
  private photosToAdd: Array<File> = [];
  private propertyID: string;
  private initialProperty: any;

  constructor(private route: ActivatedRoute,
              private editPropertyService: EditPropertyService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private photosService: PhotosService,
              private validateService: ValidateService
              ) {
    this.propertyID = route.snapshot.params['id'];
    this.getProperty(this.propertyID);
  }

  ngOnInit() {
    document.getElementById('removePhotos').hidden = true;
    let wholesalerID = localStorage.getItem('user_id');

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
      photos: []
    }
    this.pageTitle = 'Edit Property';
    this.testPhotos = ["https://scontent.flas1-1.fna.fbcdn.net/v/t1.0-9/26993322_3918229670408_8250173985738273633_n.jpg?oh=6794919c8e47c6ba7d54143eb3c357a7&oe=5B43F786", "https://scontent.flas1-1.fna.fbcdn.net/v/t1.0-9/26993322_3918229670408_8250173985738273633_n.jpg?oh=6794919c8e47c6ba7d54143eb3c357a7&oe=5B43F786", "https://scontent.flas1-1.fna.fbcdn.net/v/t1.0-9/26993322_3918229670408_8250173985738273633_n.jpg?oh=6794919c8e47c6ba7d54143eb3c357a7&oe=5B43F786"];
  }

  getProperty(id) {
    this.editPropertyService.getPropertyByID(id)
      .subscribe((response) => {
        this.initialProperty = response.data;
        this.photos = this.initialProperty.photos;
        if (this.initialProperty.photos.length === 3) {
          let inputButton = (<HTMLInputElement>document.getElementById('imageInput'));
          inputButton.disabled = true;
        }
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

  public addPhoto(event) {
    let file = event.target.files[0];
    let fileType = file["type"];
    if (this.validateService.validatePhotoInput(fileType)) {
      this.photo = event.target.files[0];
      this.photosToAdd.push(this.photo);
    }
  }

  public uploadPhotos(event) {
    this.photosService.uploadPhotos(this.photosToAdd, (error, photos) => {
      if (error) {
        this.flashMessage.show('Error uploading photos. Please try again later.', {
          cssClass: 'alert-danger',
          timeout: 2000
        })
      } else {
        this.photos = photos;
      }
    })
  }

  public removePhoto(photo) {
    // figure out how to remove photo from firebase storage
  }

}
