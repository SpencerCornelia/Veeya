import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ViewPropertyService } from '../services/viewProperty.service';

@Injectable()
export class EditPropertyGuard implements CanActivate {
  constructor(private authService: AuthService, private viewPropertyService: ViewPropertyService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let propertyId = route.params.id;

    let loggedIn = this.authService.loggedIn();
    let userId = this.authService.loggedInUser();

    let currentUserType = this.authService.loggedInUserType();
    let userType = route.data.userType;
    if (currentUserType != userType || !loggedIn) {
      return false;
    } else {
      if (this.isWholesaler(userId, propertyId)) {
        return true;
      } else if (loggedIn) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

  }

  isWholesaler(userId, propertyId) {
    this.viewPropertyService.getPropertyById(propertyId)
      .subscribe((property) => {
        if (property.wholesaler_id === userId) {
          return true;
        } else {
          return false;
        }
      }, (error) => {
        return false;
      })
  }

}