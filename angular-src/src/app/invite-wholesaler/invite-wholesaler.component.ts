import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { User } from '../models/User';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-invite-wholesaler',
  templateUrl: './invite-wholesaler.component.html',
  styleUrls: ['./invite-wholesaler.component.css']
})
export class InviteWholesalerComponent implements OnInit {

  private currentUser: User;
  private newWholesaler: User;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) { }

  ngOnInit() {
    let randomString = Math.random().toString(36).slice(-8);
    let investorID = this.authService.loggedInUser();
    this.newWholesaler = {
      userType: 'Wholesaler',
      firstName: '',
      lastName: '',
      password: randomString,
      userName: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: 'AL',
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      },
      investor_id: investorID
    }

  }

  onSubmit() {
    this.newWholesaler.userName = this.newWholesaler.firstName.toString() + this.newWholesaler.lastName.toString();
    this.inviteService.inviteWholesaler(this.newWholesaler)
      .subscribe((response) => {
        this.alertService.success(response.message, true);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.alertService.error('Error inviting wholesaler.', true);
      });
  }

}
