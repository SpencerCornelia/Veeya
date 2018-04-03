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
  private newLender: User;

  constructor(private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) { }

  ngOnInit() {
    let randomString = Math.random().toString(36).slice(-8);
    let user_id = this.authService.loggedInUser();
    this.newLender = {
      userType: 'Lender',
      userName: '',
      password: randomString,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      user_id: user_id,
      city: '',
      state: 'AL',
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      }
    }

  }

  onSubmit() {
    this.newLender.userName = this.newLender.firstName.toString() + this.newLender.lastName.toString();
    this.inviteService.inviteLender(this.newLender)
      .subscribe((response) => {
        this.router.navigate(['/dashboard']);

      },
      (error) => {

      });
  }

}
