import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { DealAdService } from '../services/dealAd.service';

import { NewAd } from '../models/NewAd';
import { User } from '../models/User';

@Component({
  selector: 'app-view-deal-ads',
  templateUrl: './view-deal-ads.component.html',
  styleUrls: ['./view-deal-ads.component.css']
})
export class ViewDealAdsComponent implements OnInit {

  private currentAds: Array<NewAd> = [];
  private currentUser: string;
  private userType: string;
  private investorUserType: boolean = false;
  private wholesalerUserType: boolean = false;
  private lenderUserType: boolean = false;

  constructor(private alertService: AlertService,
              private authService: AuthService,
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
          this.currentAds = response;
        }, (error) => {
          this.alertService.error('Error retrieving deal ads for investor.');
        });
    } else {
      this.dealAdService.getAllAds()
        .subscribe((response) => {
          this.currentAds = response;
        }, (error) => {
          this.alertService.error('Error retrieving all ads.');
        });
    }
  }

}
