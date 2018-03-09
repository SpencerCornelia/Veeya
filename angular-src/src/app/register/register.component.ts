import { Component, OnInit } from '@angular/core';

import { RegisterUser } from '../models/RegisterUser';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private newUser: RegisterUser;
  private error: any;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.newUser = {
      userType: 'Investor',
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      email: '',
      phoneNumber: ''
    }
  }

  onRegisterSubmit() {
    // required fields
    if(!this.validateService.validateRegister(this.newUser)) {
      // need error message
      return false;
    }

    // validate password confirmation
    if (!this.validateService.validatePassword(this.newUser.password, this.newUser.passwordConfirm)) {
      // error message = 'Passwords do not match'
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(this.newUser.email)) {
      // error message = 'Please enter a valid email.'
      return false;
    }

    if (!this.validateService.validatePhoneNumber(this.newUser.phoneNumber)) {
      // error message = 'Please enter a valid phone number.'
      return false;
    }

    // register user
    this.authService.registerUser(this.newUser);
  }

}
