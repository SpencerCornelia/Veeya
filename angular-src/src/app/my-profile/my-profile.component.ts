import { Component, OnInit } from '@angular/core';

import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { PhotosService } from '../services/photos.service';
import { UserService } from '../services/user.service';
import { ValidateService } from '../services/validate.service';

declare var $: any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private currentUser: User;
  private defaultProfilePhoto: string = 'https://firebasestorage.googleapis.com/v0/b/veeya-c0185.appspot.com/o/default-profile-image%2Fdefault-profile-image.jpg?alt=media&token=cb5fd586-a920-42eb-9a82-59cc9020aaed';
  private edit: Boolean = false;
  private password: any;
  private photo: File;

  constructor(private authService: AuthService,
              private photosService: PhotosService,
              private userService: UserService,
              private validateService: ValidateService) { }

  ngOnInit() {
    document.getElementById("updatePhotoButton").setAttribute('disabled', 'disabled');
    this.getCurrentUser();
    this.currentUser = {
      userType: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      city: '',
      state: 'AL',
      profilePhoto: '',
      connections: [],
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      }
    }

    this.password = {
      current: '',
      new: '',
      newConfirm: ''
    }
  }

  onSubmit() {
    this.userService.updateUserProfile(this.currentUser)
      .subscribe((response) => {
        this.currentUser = response;
      }, (error) => {

      });
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  isDisabled() {
    return !this.edit;
  }

  editProfile() {
    this.edit = !this.edit;
  }

  addProfileImage(event) {
    let file = event.target.files[0];
    let fileType = file["type"];
    if (this.validateService.validatePhotoInput(fileType)) {
      this.photo = file;
      document.getElementById("updatePhotoButton").removeAttribute('disabled');
    } else {
      // display an error message telling user to upload a file that is an image
    }
  }

  uploadProfilePhoto() {
    this.photosService.uploadProfileImagePhoto(this.photo, (error, photo) => {
      if (error) {
        // error message = 'Error uploading photo. Please try again.'
      } else {
        let inputValue = (<HTMLInputElement>document.getElementById('imageInput'));
        inputValue.value = "";
        this.photosService.getProfileImageUrl(photo, (error, firebasePhoto) => {
          if (error) {
            // error message = 'Error uploading photo. Please try again.'
            return;
          } else {
            if (this.currentUser.profilePhoto != this.defaultProfilePhoto) {
              this.photosService.removePropertyPhoto(this.currentUser.profilePhoto, (error, success) => {
                if (error) {

                } else {
                  this.userService.updateUserProfilePhoto(firebasePhoto)
                    .subscribe((response) => {
                      this.currentUser.profilePhoto = firebasePhoto;
                    }, (error) => {

                    });
                }
              });
            }
          }
        });
      }
    });
  }

  updatePassword() {
    if (this.validateService.validatePassword(this.password.new, this.password.newConfirm)) {
      this.userService.updatePassword(this.password.current, this.password.new)
        .subscribe((response) => {
          this.clearPasswordForm();
        }, (error) => {
          this.clearPasswordForm();
        });
    }
  }

  clearPasswordForm() {
    this.password.current = '';
    this.password.new = '';
    this.password.newConfirm = '';
  }

}
