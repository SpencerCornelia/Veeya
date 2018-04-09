import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Bid } from '../models/Bid';
import { Property } from '../models/Property';

import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

@Injectable()
export class AuctionService {

  private bids: Array<Bid> = [];
  private closingTime: Date;
  private property = new ReplaySubject(1);

  public propertyExists: boolean = false;

  private socket;
  private api = 'http://localhost:3000/bids/';

  constructor(private http: Http) {
    this.socket = io.connect();
  }

  ngOnInit() {

  }

  setProperty(property: Property) {
    this.property.next(property);
    this.propertyExists = true;
  }

  getProperty() {
    return this.property.asObservable();
  }

  getInitialBids(propertyId: string) {
    let URI = `http://localhost:3000/bids/${propertyId}`;
    return this.http.get(URI)
      .map((res) => {
        return res.json()
      })
      .map((res) => {
        this.bids = res.data.bids;
        this.closingTime = res.data.closingTime;
        return res;
      })
  }

  getBidData() {
    return this.bids;
  }

  getClosingTime() {
    return this.closingTime;
  }

  getBids() {
    let observable = new Observable((observer) => {
      this.socket = io(this.api);
      this.socket.on('new-bid', (data) => {
        observer.next(data);
        console.log('data received from socket:', data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    return observable;
  }

  sendBid(propertyId: string, user: any, amount: string) {
    let bid = {
      propertyId: propertyId,
      user: user,
      amount: amount
    }
    this.socket.emit('add-bid', bid);
  }

  openAuction(propertyId: string) {
    this.bids = [];
    this.closingTime = null;

    let URI = `http://localhost:3000/bids/openauction`;
    let headers = new Headers;
    let body = JSON.stringify({
      propertyId: propertyId
    });
    headers.append('Content-Type', 'application/json');
    return this.http.put(URI, body, { headers: headers })
      .map(res => res.json())
      .map(res => res.data)
  }

}