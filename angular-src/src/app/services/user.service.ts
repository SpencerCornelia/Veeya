import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

import { User } from '../models/User';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http, private authService: AuthService) { }

  private serverApi = 'http://localhost:3000';

  public getAllUsers():Observable<User[]> {
    let URI = this.serverApi + "/user/all";
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <User[]>res.data);
  }

  public getAllInvestors() {
    let URI = this.serverApi + "/investor/all";
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <User[]>res.data)
  }

  public getAllWholesalers() {
    let URI = this.serverApi + "/wholesaler/all";
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <User[]>res.data)
  }

  public getAllLenders() {
    let URI = this.serverApi + "/lender/all";
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <User[]>res.data)
  }

  public getUserById(id):Observable<User> {
    let URI = this.serverApi + "/user/" + id;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <User>res.data)
  }

  public searchInvestorEmailUsername(email, username) {
    let URI = this.serverApi + "/investor/searchInvestor";
    return this.http.get(URI, {
      params: {
        email: email,
        userName: username
      }
    })
      .map(res => res.json())
      .map(res => res.data)
  }

  public updateUserProfile(user: User) {
    let userId = this.authService.loggedInUser();
    let URI = this.serverApi + `/user/updateProfileInfo/${userId}`;
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      city: user.city,
      state: user.state,
      URLs: {
        personal: user.URLs.personal,
        facebook: user.URLs.facebook,
        linkedIn: user.URLs.linkedIn,
        biggerPockets: user.URLs.biggerPockets
      }
    });
    return this.http.post(URI, body, { headers: headers })
      .map(res => res.json())
      .map(res => res.data)
  }

}
