import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-invite-lender',
  templateUrl: './invite-lender.component.html',
  styleUrls: ['./invite-lender.component.css']
})
export class InviteLenderComponent implements OnInit {

  private currentUser: User;
  private lender: User;

  constructor(private authService: AuthService,
              private inviteService: InviteService,
              private router: Router)
              {
                this.getCurrentUser();
              }

  ngOnInit() {
    let user_id = this.authService.loggedInUser();
    this.lender = {
      userType: 'Lender',
      userName: '',
      password: 'initialPassword',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      user_id: user_id
    }

    this.currentUser = {
      userType: '',
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      phoneNumber: ''
    }
  }

  onSubmit() {
    this.lender.userName = this.lender.firstName.toString() + this.lender.lastName.toString();
    this.inviteService.inviteLender(this.lender)
      .subscribe((response) => {
        this.router.navigate(['/dashboard']);

      },
      (error) => {

      });
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

}
