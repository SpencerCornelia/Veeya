import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class InviteInvestorService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/';

  public inviteInvestor(user: User) {
    let URI = this.serverApi + "investor/inviteinvestor";
    let headers = new Headers;
    let body = JSON.stringify({
      _id: 0,
      userType: user.userType,
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      wholesaler_id: user.wholesaler_id
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