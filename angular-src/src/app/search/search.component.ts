import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { GetAllPropertiesService } from '../services/getAllProperties.service';
import { Property } from '../models/Property';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private currentTab: String = "Wholesalers";
  private lenders: Array<User> = [];
  private investors: Array<User> = [];
  private properties: Array<Property> = [];
  private users: Array<User> = [];
  private wholesalers: Array<User> = [];
  private user_id: String;
  private user_type: String;

  private investorsTab: String = 'false';
  private lendersTab: String = 'false';
  private propertiesTab: String = 'false';
  private wholesalersTab: String = 'true';

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private getAllPropertiesService: GetAllPropertiesService,
              private userService: UserService) { }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.user_type = this.authService.loggedInUserType();

    if (this.user_type === 'Investor') {
      this.getAllWholesalers();
      this.getAllLenders();
      this.getAllProperties();
    } else if (this.user_type === 'Wholesaler') {
      this.getAllInvestors();
      this.getAllLenders();
      this.getAllProperties();
    } else if (this.user_type === 'Lender') {
      this.getAllWholesalers();
      this.getAllInvestors();
      this.getAllProperties();
    }

  }

  getAllWholesalers() {
    this.userService.getAllWholesalers()
      .subscribe((response) => {
        this.wholesalers = response;
      }, (error) => {
        this.alertService.error('Error retrieving wholesaler users.');
      });
  }

  getAllProperties() {
    this.getAllPropertiesService.getAllProperties()
      .subscribe((response) => {
        this.properties = response;
      }, (error) => {
        this.alertService.error('Error retrieving properties.');
      });
  }

  getAllInvestors() {
    this.userService.getAllInvestors()
      .subscribe((response) => {
        this.investors = response;
      }, (error) => {
        this.alertService.error('Error retrieving investor users.');
      });
  }

  getAllLenders() {
    this.userService.getAllLenders()
      .subscribe((response) => {
        this.lenders = response;
      }, (error) => {
        this.alertService.error('Error retrieving lender users.');
      });
  }

  changeTab(tab) {
    if (this.currentTab === "Wholesalers") {
      this.wholesalersTab = 'false';
      this.currentTab = tab;
    } else if (this.currentTab === "Investors") {
      this.investorsTab = 'false';
      this.currentTab = tab;
    } else if (this.currentTab === "Lenders") {
      this.lendersTab = 'false';
      this.currentTab = tab;
    } else {
      this.propertiesTab = 'false';
      this.currentTab = tab;
    }
  }

}
