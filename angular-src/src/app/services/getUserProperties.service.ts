import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../models/Property';

import 'rxjs/add/operator/map';

@Injectable()
export class GetUserPropertiesService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/properties';

  public getUserProperties(userID):Observable<Property[]> {
    let URI = this.serverApi + "/" + userID;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <Property[]>res.properties);
  }

}