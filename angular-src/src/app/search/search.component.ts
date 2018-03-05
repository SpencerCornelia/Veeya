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

  private investors: Array<User> = [];
  private properties: Array<Property> = [];
  private users: Array<User> = [];
  private wholesalers: Array<User> = [];
  private user_id: String;
  private user_type: String;

  constructor(private authService: AuthService,
              private getAllPropertiesService: GetAllPropertiesService,
              private userService: UserService) { }

  ngOnInit() {
    this.user_id = this.authService.loggedInUser();
    this.user_type = this.authService.loggedInUserType();

    if (this.user_type === 'Investor') {
      this.getAllWholesalers();
      this.getAllProperties();
    } else if (this.user_type === 'Wholesaler') {
      this.getAllInvestors();
    } else if (this.user_type === 'Lender') {
      this.getAllUsers();
    }
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

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe((response) => {
        this.users = response;
      }, (error) => {

      })
  }

}
