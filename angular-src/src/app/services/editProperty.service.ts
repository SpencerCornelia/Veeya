import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../models/Property';

import 'rxjs/add/operator/map';

@Injectable()
export class EditPropertyService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/properties';

  public getPropertyByID(id): Observable<Property> {
    let URI = this.serverApi + '/editproperty/' + id;
    return this.http.get(URI)
      .map((res) => {
        return JSON.parse((<any>res)._body);
      })
  }

  public editProperty(property: Property) {
    let URI = this.serverApi + "/editproperty/" + property._id;
    let headers = new Headers;
    let body = JSON.stringify({
      _id: property._id,
      wholesaler: property.wholesaler,
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
      status: property.status,
      comps: property.comps
    });
    headers.append('Content-Type', 'application/json');
    return this.http.put(URI, body, {headers: headers})
      .map((res) => {
        return res.json();
      })
  }
}