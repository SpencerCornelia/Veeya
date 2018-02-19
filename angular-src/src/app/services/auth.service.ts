import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


import { HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class AuthService {
  authToken: any;
  user: any;

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
    // return this.http.post(route, user, { headers: headers })
    //   .map((res) => {
    //     return res.json();
    //   });
    return this.http.post(route, user, { headers: headers })
      .toPromise()
      .then((response) => {
        response.json();
      })
      .catch(this.handleError)
  }
}