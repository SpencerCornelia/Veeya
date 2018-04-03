import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { AlertService } from '../services/alert.service';
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

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) {}

  ngOnInit() {
    let randomString = Math.random().toString(36).slice(-8);
    let wholesalerID = this.authService.loggedInUser();
    this.newInvestor = {
      userType: 'Investor',
      userName: '',
      password: randomString,
      firstName: '',
      lastName: '',
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
      wholesaler_id: wholesalerID
    }
  }

  onSubmit() {
    this.newInvestor.userName = this.newInvestor.firstName.toString() + this.newInvestor.lastName.toString();
    this.inviteService.inviteInvestor(this.newInvestor)
      .subscribe((response) => {
        this.alertService.success(response.message, true);
        this.router.navigate(['/dashboard']);
      },
      (error) => {

      });
  }


}
