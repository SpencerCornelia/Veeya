import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GetUserPropertiesService } from '../services/getUserProperties.service';

@Injectable()
export class EditPropertyGuard implements CanActivate {
  constructor(private authService: AuthService, private getUserPropertiesService: GetUserPropertiesService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let propertyId = route.params.id;

    let loggedIn = this.authService.loggedIn();
    let userId = this.authService.loggedInUser();

    let currentUserType = this.authService.loggedInUserType();
    let userType = route.data.userType;
    if (currentUserType != userType || !loggedIn) {
      return false;
    } else {
      if (this.checkProperties(userId, propertyId, loggedIn)) {
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

  checkProperties(userId, propertyId, loggedIn) {
    let canAccess = false;
    this.getUserPropertiesService.getWholesalerUserProperties(userId)
      .subscribe((properties) => {
        properties.forEach((property) => {
          if (property.wholesaler_id === propertyId) {
            canAccess = true;
          }
        });
      })

      return canAccess;
  }

}