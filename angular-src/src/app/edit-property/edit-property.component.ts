import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/User';

import { AuthService } from '../services/auth.service';
import { EditPropertyService } from '../services/editProperty.service';
import { PhotosService } from '../services/photos.service';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  private currentUser: User;
  private pageTitle: String;
  private photo: File;
  private testPhotos: Array<String> = [];
  private photos: Array<String> = [];
  private photosToAdd: Array<File> = [];
  private propertyID: string;
  private initialProperty: Property;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private editPropertyService: EditPropertyService,
              private router: Router,
              private photosService: PhotosService,
              private validateService: ValidateService
              ) {
    this.getCurrentUser();
    this.propertyID = route.snapshot.params['id'];
    this.getProperty(this.propertyID);
  }

  ngOnInit() {
    // document.getElementById('removePhotos').hidden = true;
    let wholesalerID = this.authService.loggedInUser();

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
      state: ''
    }

    this.pageTitle = 'Edit Property';
    this.testPhotos = ["https://scontent.flas1-1.fna.fbcdn.net/v/t1.0-9/26993322_3918229670408_8250173985738273633_n.jpg?oh=6794919c8e47c6ba7d54143eb3c357a7&oe=5B43F786", "https://scontent.flas1-1.fna.fbcdn.net/v/t1.0-9/26993322_3918229670408_8250173985738273633_n.jpg?oh=6794919c8e47c6ba7d54143eb3c357a7&oe=5B43F786", "https://scontent.flas1-1.fna.fbcdn.net/v/t1.0-9/26993322_3918229670408_8250173985738273633_n.jpg?oh=6794919c8e47c6ba7d54143eb3c357a7&oe=5B43F786"];
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  getProperty(id) {
    this.editPropertyService.getPropertyByID(id)
      .subscribe((response) => {
        this.initialProperty = response.data;
        this.photos = this.initialProperty.photos;
        if (this.initialProperty.photos.length === 3) {
          // let inputButton = (<HTMLInputElement>document.getElementById('imageInput'));
          // inputButton.disabled = true;
          // document.getElementById('uploadPhotos').hidden = true;
        }
      }, (error) => {

      });
  }

  onSubmit() {
    this.photosService.getPropertyPhotoUrls(this.photos, (error, photos) => {
      if (error) {
        // error message
        return;
      } else {
        this.initialProperty.photos = photos;
      }
    });

    this.editPropertyService.editProperty(this.initialProperty)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
       }
      }, (error) => {

      });
  }

  addPhoto(event) {
    let file = event.target.files[0];
    let fileType = file["type"];
    if (this.validateService.validatePhotoInput(fileType)) {
      this.photo = event.target.files[0];
      this.photosToAdd.push(this.photo);
      document.getElementById('selectedFiles').innerHTML += file.name + "</br>";
    }

    if (this.photos.length + this.photosToAdd.length === 3) {
      let inputButton = (<HTMLInputElement>document.getElementById('imageInput'));
      inputButton.disabled = true;
    }
  }

  uploadPhotos(event) {
    this.photosService.uploadPropertyPhotos(this.photosToAdd, (error, photos) => {
      if (error) {

      } else {
        this.photos = photos;
        this.photosToAdd = [];
      }
    })
  }

  removePhoto(photo) {
    this.photosService.removePropertyPhoto(photo, (error) => {
      if (error) {
        // error message = 'Error removing photo. Please try again.'
      } else {
        // message = 'Successfully removed photo.'
      }
    });
  }

}
