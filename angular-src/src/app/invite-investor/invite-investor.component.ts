import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Investor } from '../models/Investor';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { InviteInvestorService } from '../services/inviteInvestor.service';
import { ModuleWithProviders } from '@angular/core';

@Component({
  selector: 'app-invite-investor',
  templateUrl: './invite-investor.component.html',
  styleUrls: ['./invite-investor.component.css']
})
export class InviteInvestorComponent implements OnInit {

  private newInvestor: Investor;
  @Output() addInvitedInvestor: EventEmitter<Investor> = new EventEmitter<Investor>();

  constructor(private inviteInvestorService: InviteInvestorService, private router: Router) { }

  ngOnInit() {
    this.newInvestor = {
      userType: 'Investor',
      userName: '',
      password: 'initialPassword',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      wholesaler: '5a19be40ac529d148276ee90'
    }
  }

  public onSubmit() {
    this.inviteInvestorService.inviteInvestor(this.newInvestor)
      .subscribe((response) => {
        if (response.success === true) {
          this.addInvitedInvestor.emit(this.newInvestor);
          this.router.navigate(['/properties']);
        }
      });
  }

}
