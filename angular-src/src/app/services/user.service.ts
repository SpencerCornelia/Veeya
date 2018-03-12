import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/User';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

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
    let URI = this.serverApi + "/lenders/all";
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

}
