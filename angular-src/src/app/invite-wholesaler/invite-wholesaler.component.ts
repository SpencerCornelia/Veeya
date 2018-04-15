import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
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
export class InviteWholesalerComponent implements OnInit, OnDestroy {

  private inviteWholesalerSubscription;

  private investorID: string;
  private wholesaler: any;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) { }

  ngOnInit() {
    this.investorID = this.authService.loggedInUser();
    this.wholesaler = {
      email: ''
    }

  }

  onSubmit() {
    this.inviteWholesalerSubscription = this.inviteService.inviteWholesaler(this.wholesaler.email, this.investorID)
      .subscribe((response) => {
        this.alertService.success(response.message, true);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.alertService.error('Error inviting wholesaler.', true);
      });
  }

  ngOnDestroy() {
    this.inviteWholesalerSubscription.unsubscribe();
  }

}
