import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let serverApi = "http://localhost:3000/";
    let userType = user.userType;
    let route = serverApi + 'login' + userType;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(route, user, { headers: headers })
      .map((res) => {
        res.json();
      });
  }
}