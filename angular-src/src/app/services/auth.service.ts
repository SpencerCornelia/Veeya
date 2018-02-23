import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  authToken: any;
  user_id: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let serverApi = "http://localhost:3000/";
    let userType = user.userType;
    let route = serverApi + 'register/' + userType;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    delete user.passwordConfirm;
    let userName = user.userName || (user.firstName + user.lastName);

    return this.http.post(route, user, { headers: headers })
      .map((response) => {
        return response.json();
      })
      .catch((error) => {
        return Observable.throw(error.json());
      });
  }

  authenticateUser(user) {
    let serverApi = "http://localhost:3000/login/";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (user.userType === 'Investor') {
      let route = serverApi + 'investor';
      return this.http.post(route, user, { headers: headers })
        .map((response) => {
          return response.json();
        })
        .catch((error)  => {
          return Observable.throw(error.json());
        });
    } else {
      let route = serverApi + 'wholesaler';
      return this.http.post(route, user, { headers: headers })
        .map((response) => {
          return response.json();
        })
        .catch((error) => {
          return Observable.throw(error.json());
        });
    }
  }

  investorUser() {
    let userType = localStorage.getItem('user_type');
    return userType === 'Investor' ? true : false;
  }

  wholesalerUser() {
    let userType = localStorage.getItem('user_type');
    return userType === 'Wholesaler' ? true : false;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  storeUserData(token, user_id, user_type) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('user_type', user_type);
    this.authToken = token;
    this.user_id = user_id;
  }

  logout() {
    this.authToken = null;
    this.user_id = null;
    localStorage.clear();
  }
}