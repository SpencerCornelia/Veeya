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
        console.log("response:", response)
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

  loadToken() {
    const token = localStorage.getItem('token_id');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  storeUserData(token, user_id) {
    localStorage.setItem('token_id', token);
    localStorage.setItem('user_id', user_id);
    this.authToken = token;
    this.user_id = user_id;
  }

  logout() {
    this.authToken = null;
    this.user_id = null;
    localStorage.clear();
  }
}