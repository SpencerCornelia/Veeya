import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ValidateService {

  constructor(private http: Http) { }

  validateRegister(user) {
    if (!user.firstName || !user.lastName || !user.email || !user.firstName) {
      return false;
    } else {
      return true;
    }
  }

  validatePassword(password1, password2) {
    if (password1 === password2) {
      return true;
    } else {
      return false;
    }
  }

  validateEmail(email) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  validateLogin(user) {
    if (!user.email || !user.password || !user.userType) {
      return false;
    } else {
      return true;
    }
  }

}
