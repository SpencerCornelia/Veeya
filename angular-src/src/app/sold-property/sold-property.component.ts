import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

import { Property } from '../models/Property';
import { User } from '../models/User';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { SoldPropertyService } from '../services/soldProperty.service';
import { UserService } from '../services/user.service';
import { ViewPropertyService } from '../services/viewProperty.service';

@Component({
  selector: 'app-sold-property',
  templateUrl: './sold-property.component.html',
  styleUrls: ['./sold-property.component.css']
})
export class SoldPropertyComponent implements OnInit, OnDestroy {

  private getAllInvestorsSubscription;
  private getPropertySubscription;
  private getSoldPropertySubscription;
  private soldPropertyPendingSubscription;

  private currentUser: User;
  private investors: Array<User> = [];
  private property: Property;
  private propertyId: string;
  private wholesalerID: string;

  private displayMessage: Boolean = true;
  private displayBody: Boolean = false;

  private selectedInvestor: User;

  constructor(
    private alertService: AlertService,
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
    this.getSoldPropertySubscription = this.viewPropertyService.getSoldProperty()
      .subscribe((response) => {
        this.displayMessage = false;
        this.displayBody = true;
        this.property = response;
      })
  }

  getInvestors() {
    this.getAllInvestorsSubscription = this.userService.getAllInvestors()
      .subscribe((response) => {
        this.investors = response;
      }, (error) => {
        this.alertService.error('Error retrieving investor users.');
      });
  }

  showModal(investor) {
    let that = this;

    if (!this.property) {
      this.getPropertySubscription = this.viewPropertyService.getPropertyById(this.propertyId)
        .subscribe((response) => {
          this.property = response;
          this.selectedInvestor = investor;
          $("#soldModal").modal('show');
          $("#soldConfirm").on('click', function() {
            that.soldPropertyPendingSubscription = that.soldPropertyService.soldPropertyPending(that.property, that.selectedInvestor._id)
              .subscribe((response) => {
                $("#soldModal").modal('hide');
                that.router.navigate(['/dashboard']);
                that.alertService.success('Success', true);
              }, (error) => {
                that.alertService.error('Error marking property as sold.');
              });
          });
        }, (error) => {
          this.alertService.error('Error retrieving property information.');
        });
    } else {
      this.selectedInvestor = investor;
      $("#soldModal").modal('show');
      $("#soldConfirm").on('click', function() {
        that.soldPropertyPendingSubscription = that.soldPropertyService.soldPropertyPending(that.property, that.selectedInvestor._id)
          .subscribe((response) => {
            $("#soldModal").modal('hide');
            that.alertService.success('Success.', true);
            that.router.navigate(['/dashboard']);
          }, (error) => {
            that.alertService.error('')
          });
      });
    }

  }

  ngOnDestroy() {
    this.getAllInvestorsSubscription.unsubscribe();
    this.getPropertySubscription.unsubscribe();
    this.getSoldPropertySubscription.unsubscribe();
    this.soldPropertyPendingSubscription.unsubscribe();
  }

}
