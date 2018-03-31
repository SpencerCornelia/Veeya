import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { NewAd } from '../models/NewAd';

import 'rxjs/add/operator/map';

@Injectable()
export class DealAdService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000';

  public placeNewAd(newAd: NewAd) {
    let URI = this.serverApi + "/ads/placeNewAd";
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({
      newAd: newAd
    });
    return this.http.post(URI, body, { headers: headers })
      .map(res => res.json())
      .map(res => res);
  }

}
