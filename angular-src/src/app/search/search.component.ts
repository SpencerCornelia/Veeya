import { Component, OnInit } from '@angular/core';

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
  private currentUser: User;
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

  constructor(private authService: AuthService,
              private getAllPropertiesService: GetAllPropertiesService,
              private userService: UserService)
              {
                this.getCurrentUser();
              }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.user_type = this.authService.loggedInUserType();

    if (this.user_type === 'Investor') {
      this.getAllWholesalers();
      this.getAllProperties();
    } else if (this.user_type === 'Wholesaler') {
      this.getAllInvestors();
      this.getAllProperties();
    } else if (this.user_type === 'Lender') {
      this.getAllWholesalers();
      this.getAllInvestors();
      this.getAllProperties();
    }

    this.currentUser = {
      userType: '',
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: '',
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      }
    }
  }

  getCurrentUser() {
    this.authService.getLoggedInUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      }, (error) => {

      })
  }

  getAllWholesalers() {
    this.userService.getAllWholesalers()
      .subscribe((response) => {
        this.wholesalers = response;
      }, (error) => {

      })
  }

  getAllProperties() {
    this.getAllPropertiesService.getAllProperties()
      .subscribe((response) => {
        this.properties = response;
      }, (error) => {

      })
  }

  getAllInvestors() {
    this.userService.getAllInvestors()
      .subscribe((response) => {
        this.investors = response;
      }, (error) => {

      })
  }

  getAllLenders() {
    this.userService.getAllLenders()
      .subscribe((response) => {
        this.lenders = response;
      }, (error) => {

      })
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
