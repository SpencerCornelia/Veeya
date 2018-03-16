import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { User } from '../models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private currentUser: User;

  constructor(private authService: AuthService,
              private router: Router)
            {
              this.getCurrentUser();
            }

  ngOnInit() {
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

  isInvestor() {
    let userType = this.authService.loggedInUserType();
    if (userType === 'Investor') {
      return true;
    } else {
      return false;
    }
  }

  isWholesaler() {
    let userType = this.authService.loggedInUserType();
    if (userType === 'Wholesaler') {
      return true;
    } else {
      return false;
    }
  }

  onLogoutClick() {
    this.authService.logout();

    this.router.navigate(['/login']);
    return false;
  }

}
