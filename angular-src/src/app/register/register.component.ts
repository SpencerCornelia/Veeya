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
      passwordConfirm: '',
      email: '',
      phoneNumber: ''
    }
  }

  onRegisterSubmit() {
    // required fields
    if(!this.validateService.validateRegister(this.newUser)) {
      this.flashMessage.show('Please fill in all fields.', {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      return false;
    }

    // validate password confirmation
    if (!this.validateService.validatePassword(this.newUser.password, this.newUser.passwordConfirm)) {
      this.flashMessage.show('Passwords do not match.', {
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
      .subscribe((response) => {
        this.router.navigate(['/properties'])
        this.flashMessage.show(response.message, {
          cssClass: 'alert-success',
          timeout: 3000
        });
      }, (error) => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      });
  }

}
