import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


import { HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class AuthService {
  authToken: any;
  user_id: any;

  constructor(private http: Http) { }

  handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  registerUser(user) {
    let serverApi = "http://localhost:3000/";
    let userType = user.userType;
    let route = serverApi + 'register/' + userType;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // database does not account for a second password field
    // delete before http request
    delete user.passwordConfirm;
    let userName = user.userName || (user.firstName + user.lastName);

    return this.http.post(route, user, { headers: headers })
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError)
  }

  authenticateUser(user) {
    let serverApi = "http://localhost:3000/login/";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (user.userType === 'Investor') {
      let route = serverApi + 'investor';
      return this.http.post(route, user, { headers: headers })
        .toPromise()
        .then((response) => {
          return response.json();
        })
        .catch(this.handleError);
    } else {
      let route = serverApi + 'wholesaler';
      return this.http.post(route, user, { headers: headers })
        .toPromise()
        .then((response) => {
          return response.json();
        })
        .catch(this.handleError)
    }
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