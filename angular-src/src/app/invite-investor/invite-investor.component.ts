import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-invite-investor',
  templateUrl: './invite-investor.component.html',
  styleUrls: ['./invite-investor.component.css']
})
export class InviteInvestorComponent implements OnInit {

  private currentUser: User;
  private newInvestor: User;

  constructor(private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) {}

  ngOnInit() {
    let wholesalerID = this.authService.loggedInUser();
    this.newInvestor = {
      userType: 'Investor',
      userName: '',
      password: 'initialPassword',
      firstName: '',
      lastName: '',
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
      wholesaler_id: wholesalerID
    }
  }

  onSubmit() {
    this.newInvestor.userName = this.newInvestor.firstName.toString() + this.newInvestor.lastName.toString();
    this.inviteService.inviteInvestor(this.newInvestor)
      .subscribe((response) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {

      });
  }


}
