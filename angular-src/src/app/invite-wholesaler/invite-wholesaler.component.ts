import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Wholesaler } from '../models/Wholesaler';
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

  private newWholesaler: Wholesaler;

  constructor(private inviteWholesalerService: InviteWholesalerService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    // use this for testing purposes
    let investorID = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : '5a8cef4a6676160891429c5e';
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
        this.router.navigate(['/properties']);
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
