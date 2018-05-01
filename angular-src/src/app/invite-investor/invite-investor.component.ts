import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../models/User';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { InviteService } from '../services/invite.service';

declare var $: any;

@Component({
  selector: 'app-invite-investor',
  templateUrl: './invite-investor.component.html',
  styleUrls: ['./invite-investor.component.css']
})
export class InviteInvestorComponent implements OnInit, OnDestroy {

  private inviteInvestorSubscription;
  private subscriptions: Subscription[] = [];

  private wholesalerID: string;
  private investor: any;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) {}

  ngOnInit() {
    this.wholesalerID = this.authService.loggedInUser();
    this.investor = {
      email: ''
    }
  }

  onSubmit() {
    this.inviteInvestorSubscription = this.inviteService.inviteInvestor(this.investor.email, this.wholesalerID)
      .subscribe((response) => {
        this.alertService.success(response.message, true);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.alertService.error('Error inviting investor.', true);
      });

    this.subscriptions.push(this.inviteInvestorSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }


}
