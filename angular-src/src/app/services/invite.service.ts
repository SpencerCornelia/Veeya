import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class InviteService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/';

  public inviteInvestor(email: string, currentUser: string) {
    let URI = this.serverApi + "investor/inviteinvestor";
    let headers = new Headers;
    let body = JSON.stringify({
      _id: 0,
      userType: 'Investor',
      email: email,
      wholesaler_id: currentUser
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, { headers: headers })
      .map((response) => {
        return response.json();
      })
      .catch((error) => {
        return Observable.throw(error.json());
      })
  }

  public inviteWholesaler(email: string, currentUser: string) {
    let URI = this.serverApi + "wholesaler/invitewholesaler";
    let headers = new Headers;
    let body = JSON.stringify({
      _id: 0,
      userType: 'Wholesaler',
      email: email,
      investor_id: currentUser
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

  public inviteLender(email: string, currentUser: string) {
    let URI = this.serverApi + "lender/inviteLender";
    let headers = new Headers;
    let body = JSON.stringify({
      _id: 0,
      userType: 'Lender',
      email: email,
      invitee_id: currentUser
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, {headers: headers})
      .map((response) => {
        return response.json()
      })
      .catch((error) => {
        return Observable.throw(error.json());
      });
  }

}