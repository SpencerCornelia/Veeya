import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { User } from '../models/User';
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

  constructor(private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) { }

  ngOnInit() {
    let investorID = this.authService.loggedInUser();
    this.newWholesaler = {
      userType: 'Wholesaler',
      firstName: '',
      lastName: '',
      password: 'initialUser',
      userName: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: '',
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
        this.router.navigate(['/dashboard']);
      },
      (error) => {

      });
  }

}
