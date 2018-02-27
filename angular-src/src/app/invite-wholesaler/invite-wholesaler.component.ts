import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { InviteWholesalerService } from '../services/invitewholesaler.service';
import { ModuleWithProviders } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-invite-wholesaler',
  templateUrl: './invite-wholesaler.component.html',
  styleUrls: ['./invite-wholesaler.component.css']
})
export class InviteWholesalerComponent implements OnInit {

  private newWholesaler: User;

  constructor(private inviteWholesalerService: InviteWholesalerService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    // use this for testing purposes
    let investorID = localStorage.getItem('user_id');
    this.newWholesaler = {
      userType: 'Wholesaler',
      firstName: '',
      lastName: '',
      password: 'initialUser',
      userName: '',
      email: '',
      phoneNumber: '',
      investor_id: investorID
    }
  }

  public onSubmit() {
    this.newWholesaler.userName = this.newWholesaler.firstName.toString() + this.newWholesaler.lastName.toString();
    this.inviteWholesalerService.inviteWholesaler(this.newWholesaler)
      .subscribe((response) => {
        this.router.navigate(['/dashboard']);
        this.flashMessage.show(response.message, {
          cssClass: 'alert-success',
          timeout: 3000
        });
      },
      (error) => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      });
  }

}
