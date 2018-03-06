import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
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
