import { Component, OnInit } from '@angular/core';
import { RegisterWholesaler } from '../models/RegisterWholesaler';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
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

  private newUser: RegisterWholesaler;
  private d: any;
  private error: any;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.newUser = {
      userType: 'Investor',
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phoneNumber: ''
    }
  }

  private handleError(error: HttpErrorResponse) {
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      `${error}`
    );
  };

  onRegisterSubmit() {
    // required fields
    if(!this.validateService.validateRegister(this.newUser)) {
      this.flashMessage.show('Please fill in all fields.', {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(this.newUser.email)) {
      this.flashMessage.show('Please fill in a valid email.', {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      return false;
    }

    // register user
    this.authService.registerUser(this.newUser)
      .then(response => {
        this.router.navigate(['/properties']);
      },
      error => {
        let errorBody = JSON.parse(error._body);
        let errorMessage = errorBody.message;
        this.flashMessage.show(errorMessage, {
          cssClass: '',
          timeout: 3000
        })
      });
  }

}
