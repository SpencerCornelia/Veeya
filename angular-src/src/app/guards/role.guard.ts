import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.userType;
    const role = localStorage.getItem('user_type');

    if (expectedRole === role && this.authService.loggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}