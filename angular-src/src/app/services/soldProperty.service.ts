import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Property } from '../models/Property';
import { User } from '../models/User';

import 'rxjs/add/operator/map';

@Injectable()
export class SoldPropertyService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/properties';

  public soldProperty(property: Property) {
    let URI = this.serverApi + "/soldproperty";
    let headers = new Headers;
    let body = JSON.stringify({
      property: property
    });
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
