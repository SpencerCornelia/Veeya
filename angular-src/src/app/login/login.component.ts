import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginUser: any;

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router,
              private validateService: ValidateService) { }

  ngOnInit() {
    this.loginUser = {
      email: '',
      password: ''
    }
  }

  onLoginSubmit() {
    if(!this.validateService.validateLogin(this.loginUser)) {
      this.flashMessage.show('Please enter valid info for all fields.', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    if (!this.validateService.validateEmail(this.loginUser.email)) {
      this.flashMessage.show('Please enter a valid login.', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    this.authService.authenticateUser(this.loginUser)
      .subscribe((response) => {
        this.authService.storeUserData(response.token, response.user.id, response.user.user_type);
        this.router.navigate(['/dashboard']);
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
