import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  private currentUser: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe((response) => {
        this.currentUser = response;
      }, (error) => {

      });
  }

  onLogoutClick() {
    this.authService.logout();

    this.router.navigate(['/login']);
    return false;
  }

}
