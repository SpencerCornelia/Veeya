import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { DeletePropertyService } from '../services/deleteProperty.service';
import { EditPropertyService } from '../services/editProperty.service';
import { GetAllPropertiesService } from '../services/getAllProperties.service';
import { GetUserPropertiesService } from '../services/getUserProperties.service';
import { SoldPropertyService } from '../services/soldProperty.service';
import { ViewPropertyService } from '../services/viewProperty.service';

import { Property } from '../models/Property';
import { User } from '../models/User';

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.css']
})
export class ViewPropertiesComponent implements OnInit, OnDestroy {

  private acceptSoldPropertySubscription;
  private denySoldPropertySubscription;
  private getCurrentUserSubscription;
  private getLenderPropertiesSubscription;
  private getInvestorPropertiesSubscription;
  private getWholesalerPropertiesSubscription;
  private subscriptions: Subscription[] = [];

  private currentUser: User;
  private properties: Property[] = [];
  private userType: string;

  private investorPropertiesBought: Property[] = [];
  private investorPropertiesBoughtPending: Property[] = [];
  private investorPropertiesConnected: Property[] = [];
  private investorPropertiesStarred: Property[] = [];

  private lenderPropertiesBought: Property[] = [];
  private lenderPropertiesConnected: Property[] = [];

  private wholesalerPropertiesListed: Property[] = [];
  private wholesalerPropertiesSold: Property[] = [];
  private wholesalerPropertiesSoldPending: Property[] = [];

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private getPropertyService: GetAllPropertiesService,
              private deletePropertyService: DeletePropertyService,
              private getUserPropertiesService: GetUserPropertiesService,
              private editPropertyService: EditPropertyService,
              private soldPropertyService: SoldPropertyService,
              private viewPropertyService: ViewPropertyService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userType = this.authService.loggedInUserType();

    if (this.userType == 'Wholesaler') {
      this.getPropertiesForWholesaler();
    } else if (this.userType == 'Investor') {
      this.getPropertiesForInvestor();
    } else {
      this.getPropertiesForLender();
    }

    this.getCurrentUser();

  }

  getCurrentUser() {
    this.getCurrentUserSubscription = this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {
        this.alertService.error('Error retrieving user.');
      });
  }

  getPropertiesForWholesaler() {
    let wholesalerID = this.authService.loggedInUser();
    this.getWholesalerPropertiesSubscription = this.getUserPropertiesService.getWholesalerUserProperties(wholesalerID)
      .subscribe((response) => {
        response.forEach((property) => {
          if (property.status === 'Listed') {
            this.wholesalerPropertiesListed.push(property);
          } else if (property.status === 'Sold') {
            this.wholesalerPropertiesSold.push(property);
          } else if (property.status === 'Sold-Pending') {
            this.wholesalerPropertiesSoldPending.push(property);
          }
        });
      }, (error) => {
        this.alertService.error('Error retrieving properties for wholesaler.');
      });

    this.subscriptions.push(this.getWholesalerPropertiesSubscription);
  }

  viewProperty(property) {
    let propertyId = property._id;
    this.router.navigate(['/view/', propertyId]);
  }

  getPropertiesForInvestor() {
    let investorID = this.authService.loggedInUser();
    this.getInvestorPropertiesSubscription = this.getUserPropertiesService.getInvestorUserProperties(investorID)
      .subscribe((response) => {
        response.forEach((property) => {
          if (property.status === 'Sold') {
            this.investorPropertiesBought.push(property);
          } else if (property.status === 'Listed') {
            this.investorPropertiesConnected.push(property);
          } else if (property.status === 'Starred') {
            this.investorPropertiesStarred.push(property);
          } else if (property.status === 'Sold-Pending') {
            this.investorPropertiesBoughtPending.push(property);
          }
        });
      }, (error) => {
        this.alertService.error('Error retrieving properties for investor.');
      });

    this.subscriptions.push(this.getInvestorPropertiesSubscription);
  }

  getPropertiesForLender() {
    let lenderID = this.authService.loggedInUser();
    this.getLenderPropertiesSubscription = this.getUserPropertiesService.getLenderUserProperties(lenderID)
      .subscribe((response) => {
        response.forEach((property) => {
          if (property.status === 'Connection') {
            this.lenderPropertiesConnected.push(property);
          } else if (property.status === 'Loaned') {
            this.lenderPropertiesBought.push(property);
          }
        });
      }, (error) => {
        this.alertService.error('Error retrieving properties for lender.');
      });

    this.subscriptions.push(this.getLenderPropertiesSubscription);
  }

  acceptSold(property) {
    this.acceptSoldPropertySubscription = this.soldPropertyService.acceptSoldProperty(property, this.currentUser._id)
      .subscribe((response) => {
        this.investorPropertiesBoughtPending = this.investorPropertiesBoughtPending.filter((p) => {
          return p._id != property._id;
        });
        this.investorPropertiesBought.push(property);
      }, (error) => {
        this.alertService.error('Error accepting property as sold.');
      });

    this.subscriptions.push(this.acceptSoldPropertySubscription);
  }

  denySold(property) {
    let denyPropertyId = property._id;
    this.denySoldPropertySubscription = this.soldPropertyService.denySoldProperty(property, this.currentUser._id)
      .subscribe((response) => {
        this.investorPropertiesBoughtPending = this.investorPropertiesBoughtPending.filter((prop) => {
          return prop._id != denyPropertyId;
        });
        this.investorPropertiesConnected.push(property);
      }, (error) => {

      });

    this.subscriptions.push(this.denySoldPropertySubscription);
  }

  ngOnDestroy() {
    // this.acceptSoldPropertySubscription == undefined ? '' : this.acceptSoldPropertySubscription.unsubscribe();
    // this.denySoldPropertySubscription == undefined ? '' : this.denySoldPropertySubscription.unsubscribe();
    // this.getCurrentUserSubscription == undefined ? '' : this.getCurrentUserSubscription.unsubscribe();
    // this.getLenderPropertiesSubscription == undefined ? '' : this.getLenderPropertiesSubscription.unsubscribe();
    // this.getInvestorPropertiesSubscription == undefined ? '' : this.getInvestorPropertiesSubscription.unsubscribe();
    // this.getWholesalerPropertiesSubscription == undefined ? '' : this.getWholesalerPropertiesSubscription.unsubscribe();
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
