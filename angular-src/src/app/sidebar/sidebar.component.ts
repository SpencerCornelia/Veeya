import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  isInvestor() {
    let userType = localStorage.getItem('user_type');
    if (userType === 'Investor') {
      return true;
    } else {
      return false;
    }
  }

  isWholesaler() {
    let userType = localStorage.getItem('user_type');
    if (userType === 'Wholesaler') {
      return true;
    } else {
      return false;
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are now logged out.', {
      cssClass: 'alert-success',
      timeout: 3000
    });

    this.router.navigate(['/login']);
    return false;
  }

}
