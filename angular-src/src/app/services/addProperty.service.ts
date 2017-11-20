import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../models/Property';

import 'rxjs/add/operator/map';

@Injectable()
export class AddPropertyService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/properties';

  public addProperty(property: Property) {
    let URI = this.serverApi + "/addproperty";
    let headers = new Headers;
    let body = JSON.stringify({
      _id: property._id,
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      purchasePrice: property.purchasePrice,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      rehabCostMin: property.rehabCostMin,
      rehabCostMax: property.rehabCostMax,
      afterRepairValue: property.afterRepairValue,
      averageRent: property.averageRent,
      squareFootage: property.squareFootage,
      propertyType: property.propertyType,
      yearBuilt: property.yearBuilt,
      status: property.status
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, {headers: headers})
      .map(res => res.json());
  }
}