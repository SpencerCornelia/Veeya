import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Investor } from '../models/Investor';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { InviteInvestorService } from '../services/inviteInvestor.service';
import { ModuleWithProviders } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-invite-investor',
  templateUrl: './invite-investor.component.html',
  styleUrls: ['./invite-investor.component.css']
})
export class InviteInvestorComponent implements OnInit {

  private newInvestor: Investor;

  constructor(private inviteInvestorService: InviteInvestorService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    // use the hard coded variable for testing purposes
    let wholesalerID = localStorage.getItem('user_id');
    this.newInvestor = {
      userType: 'Investor',
      userName: '',
      password: 'initialPassword',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      wholesaler_id: wholesalerID
    }
  }

  public onSubmit() {
    this.newInvestor.userName = this.newInvestor.firstName.toString() + this.newInvestor.lastName.toString();
    this.inviteInvestorService.inviteInvestor(this.newInvestor)
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
