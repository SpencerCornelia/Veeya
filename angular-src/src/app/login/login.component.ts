import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginUser: any;

  constructor(private authService: AuthService, private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    this.loginUser = {
      email: '',
      password: '',
      userType: 'Investor'
    }
  }

  onLoginSubmit() {
    this.authService.authenticateUser(this.loginUser)
      .subscribe(data => {
        console.log("data:", data)
      });
  }

}
