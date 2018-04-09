import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuctionService } from '../services/auction.service';
import { AuthService } from '../services/auth.service';
import { Bid } from '../models/Bid';
import { Property } from '../models/Property';
import { ViewPropertyService } from '../services/viewProperty.service';

declare var $: any;

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {

  private bidData: any;
  private bids: Array<any> = [];
  private currentUser: any;
  private connection;
  private newBid: any;
  private property: any;
  private userType: string;

  constructor(private activatedRoute: ActivatedRoute,
              private auctionService: AuctionService,
              private authService: AuthService,
              private router: Router,
              private viewPropertyService: ViewPropertyService) { }

  ngOnInit() {
    // GET CURRENT USER INFO
    this.userType = this.authService.loggedInUserType();
    this.authService.getCurrentUser()
      .subscribe((response) => {
        this.currentUser = response.data;
      })

    // GET PROPERTY
    if (!this.auctionService.propertyExists) {
      this.activatedRoute.params.subscribe((params: Params) => {
        let propertyId = params['id'];
        this.viewPropertyService.getPropertyById(propertyId)
          .subscribe((response) => {
            this.property = response;
          }, (error) => {
            this.router.navigate(['/dashboard']);
          })
      })
    } else {
      this.auctionService.getProperty()
        .subscribe((response) => {
          this.property = response;
          this.bids = this.auctionService.getBidData();
        }, (error) => {

        });
    }

    // GET BIDS
    this.connection = this.auctionService.getBids()
      .subscribe((bid) => {
        this.bids.push(bid);
      })

    this.newBid = {
      amount: ''
    };
  }

  addBidModal() {
    $("#addBidModal").modal('show');
  }

  addBid() {
    this.newBid.amount = this.newBid.amount.replace(',', '');
    this.newBid.amount = this.newBid.amount.replace('$', '');
    this.auctionService.sendBid(this.property._id, this.currentUser, this.newBid.amount);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
