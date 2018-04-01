import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { DealAdService } from '../services/dealAd.service';

import { User } from '../models/User';

@Component({
  selector: 'app-view-deal-ads',
  templateUrl: './view-deal-ads.component.html',
  styleUrls: ['./view-deal-ads.component.css']
})
export class ViewDealAdsComponent implements OnInit {

  private currentUser: string;
  private userType: string;
  private investorUserType: boolean = false;
  private wholesalerUserType: boolean = false;
  private lenderUserType: boolean = false;

  constructor(private authService: AuthService,
              private dealAdService: DealAdService) { }

  ngOnInit() {
    this.currentUser = this.authService.loggedInUser();
    this.userType = this.authService.loggedInUserType();
    if (this.userType == 'Investor') {
      this.investorUserType = true;
    } else if (this.userType == 'Wholesaler') {
      this.wholesalerUserType = true;
    } else {
      this.lenderUserType = true;
    }

    this.getAds();
  }

  getAds() {
    if (this.investorUserType) {
      this.dealAdService.getDealAdsForInvestor(this.currentUser)
        .subscribe((response) => {
          console.log('response:', response);
        }, (error) => {

        })
    } else {
      this.dealAdService.getAllDeals()
    }
  }

}
