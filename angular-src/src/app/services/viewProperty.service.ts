import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Property } from '../models/Property';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ViewPropertyService {

  constructor(private http: Http) { }

  private selectedProperty = new BehaviorSubject<Property>(null);
  private serverApi = 'http://localhost:3000/properties';

  public getPropertyById(propertyId: String):Observable<Property> {
    let URI = this.serverApi + "/property/" + propertyId;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <Property>res.data);
  }

  public setProperty(property: Property) {
    this.selectedProperty.next(property);
  }

  public getProperty(): Observable<Property> {
    return this.selectedProperty.asObservable();
  }

}
