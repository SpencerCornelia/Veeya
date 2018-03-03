import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';

import { FlashMessagesService } from 'angular2-flash-messages';

import 'rxjs/add/operator/map';

@Injectable()
export class PhotosService {

  private error: Boolean = false;
  private formData: FormData = new FormData();
  private photos: Array<File> = [];
  private photoURLs: Array<String> = [];
  private propertyPhotosFolder: any;
  private user_id: String;

  constructor(private storage: AngularFireStorage, private flashMessages: FlashMessagesService) {
    this.propertyPhotosFolder = 'property-photos';
    this.user_id = localStorage.getItem('user_id');
  }

  public uploadPropertyPhotos(photos: Array<File>, callback) {
    let storageRef = firebase.storage().ref();
    for (let i = 0; i < photos.length; i++) {
      let path = `${this.propertyPhotosFolder}/${this.user_id}/` + photos[i].name;
      let imageRef = storageRef.child(path);
      imageRef.put(photos[i])
        .then((snapshot) => {
          if (snapshot.state !== 'success') {
            this.error = true;
          } else {
            this.photoURLs.push(path);
          }
        })
    }
    if (!this.error) {
      callback(false, this.photoURLs);
    } else {
      callback(true);
    }
  }

  public removePropertyPhoto(photoName: String, callback) {
    let storageRef = firebase.storage().ref();
    let path = `${this.propertyPhotosFolder}/${this.user_id}/` + photoName;
    storageRef.delete()
      .then(() => {
        callback(false);
      })
      .catch((error) => {
        callback(true);
      });
  }

  public getPropertyPhotoUrls(photos: Array<String>, callback) {
    let urls = [];
    let storageRef = firebase.storage();
    let path = `${this.propertyPhotosFolder}/${this.user_id}/`;
    for (let i = 0; i < photos.length; i++) {
      let pathRef = storageRef.ref(path + photos[i]);
      pathRef.getDownloadURL()
        .then((url) => {
          urls.push(url);
        })
        .catch((error) => {
          callback(true);
          return;
        })
    }
    callback(false, urls);
  }
}
