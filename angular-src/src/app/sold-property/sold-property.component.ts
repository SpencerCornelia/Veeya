import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

import { Property } from '../models/Property';
import { User } from '../models/User';

import { AuthService } from '../services/auth.service';
import { SoldPropertyService } from '../services/soldProperty.service';
import { UserService } from '../services/user.service';
import { ViewPropertyService } from '../services/viewProperty.service';

@Component({
  selector: 'app-sold-property',
  templateUrl: './sold-property.component.html',
  styleUrls: ['./sold-property.component.css']
})
export class SoldPropertyComponent implements OnInit {

  private currentUser: User;
  private investors: Array<User> = [];
  private property: Property;
  private propertyId: string;
  private wholesalerID: string;

  private displayMessage: Boolean = true;
  private displayBody: Boolean = false;

  private selectedInvestor: User;

  constructor(
    private authService: AuthService,
    private soldPropertyService: SoldPropertyService,
    private viewPropertyService: ViewPropertyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.wholesalerID = this.authService.loggedInUser();
    this.propertyId = this.route.snapshot.params.id;

    this.getProperty();
    this.getInvestors();
  }

  getProperty() {
    this.viewPropertyService.getSoldProperty()
      .subscribe((response) => {
        this.displayMessage = false;
        this.displayBody = true;
        this.property = response;
      })
  }

  getInvestors() {
    this.userService.getAllInvestors()
      .subscribe((response) => {
        this.investors = response;
      }, (error) => {

      });
  }

  showModal(investor) {
    let that = this;

    if (!this.property) {
      this.viewPropertyService.getPropertyById(this.propertyId)
        .subscribe((response) => {
          this.property = response;
          this.selectedInvestor = investor;
          $("#soldModal").modal('show');
          $("#soldConfirm").on('click', function() {
            that.soldPropertyService.soldProperty(that.selectedInvestor, that.wholesalerID, that.property)
              .subscribe((response) => {
                $("#soldModal").modal('hide');
                that.router.navigate(['/dashboard']);
              }, (error) => {

              });
          });
        }, (error) => {

        });
    } else {
      this.selectedInvestor = investor;
      $("#soldModal").modal('show');
      $("#soldConfirm").on('click', function() {
        that.soldPropertyService.soldProperty(that.selectedInvestor, that.wholesalerID, that.property)
          .subscribe((response) => {
            $("#soldModal").modal('hide');
            that.router.navigate(['/dashboard']);
          }, (error) => {

          });
      });
    }

  }

}
