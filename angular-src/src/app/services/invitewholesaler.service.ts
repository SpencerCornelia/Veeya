import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Wholesaler } from '../models/wholesaler.js';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class InviteWholesalerService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/';

  public inviteWholesaler(wholesaler: Wholesaler) {
    let URI = this.serverApi + "wholesaler/invitewholesaler";
    let headers = new Headers;
    let body = JSON.stringify({
      _id: 0,
      userType: wholesaler.userType,
      userName: wholesaler.userName,
      password: wholesaler.password,
      firstName: wholesaler.firstName,
      lastName: wholesaler.lastName,
      email: wholesaler.email,
      phoneNumber: wholesaler.phoneNumber,
      investor_id: wholesaler.investor_id
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, {headers: headers})
      .map((response) => {
        return response.json()
      })
      .catch((error) => {
        return Observable.throw(error.json());
      })
  }
}