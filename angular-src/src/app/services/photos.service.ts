import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PhotosService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/photos/';

  public uploadPhotos(photos: Array<any>) {
    let URI = this.serverApi + "/upload";
    let headers = new Headers;
    let body = photos;
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, {headers: headers})
      .map((response) => {
        return response.json();
      })
      .catch((error) => {
        return Observable.throw(error.json());
      });
  }
}
