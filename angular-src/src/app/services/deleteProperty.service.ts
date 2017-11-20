import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../models/Property';

import 'rxjs/add/operator/map';

@Injectable()
export class DeletePropertyService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000';

  public deleteProperty(propertyId : Number) {
    let URI = this.serverApi + "/properties/" + propertyId;
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, {headers})
      .map(res => res.json());
  }

}
