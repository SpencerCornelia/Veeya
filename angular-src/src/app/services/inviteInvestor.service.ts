import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Investor } from '../models/Investor';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class InviteInvestorService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/';

  public inviteInvestor(investor: Investor) {
    let URI = this.serverApi + "investor/inviteinvestor";
    let headers = new Headers;
    let body = JSON.stringify({
      _id: 0,
      userType: investor.userType,
      userName: investor.userName,
      password: investor.password,
      firstName: investor.firstName,
      lastName: investor.lastName,
      email: investor.email,
      phoneNumber: investor.phoneNumber,
      wholesaler_id: investor.wholesaler_id
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

}