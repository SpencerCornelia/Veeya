import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-invite-lender',
  templateUrl: './invite-lender.component.html',
  styleUrls: ['./invite-lender.component.css']
})
export class InviteLenderComponent implements OnInit {

  private lender: any
  private user_id: string;
  private email: string;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private inviteService: InviteService,
              private router: Router) { }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.lender = {
      'email': ''
    }
  }

  onSubmit() {
    this.inviteService.inviteLender(this.lender.email, this.user_id)
      .subscribe((response) => {
        this.alertService.success(response.message, true);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.alertService.error('Error inviting lender.', true);
      });
  }

}
