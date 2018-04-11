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
  private api = 'http://localhost:3000';

  constructor(private http: Http) {
    this.socket = io.connect(this.api);
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

  getBids(): any {
    let observable = new Observable((observer) => {
      this.socket.on('new-bid', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    return observable;
  }

  sendBid(propertyId: string, user: any, amount: string) {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let newMinutes;
    if (minutes < 10) {
      newMinutes = minutes.toString();
      newMinutes = '0' + minutes;
    } else {
      newMinutes = minutes;
    }
    let time;
    if (hours > 12) {
      time = (hours - 12) + ':' + newMinutes + 'pm';
    } else if (hours == 12) {
      time = hours + ':' + newMinutes + 'pm';
    } else {
      time = hours + ':' + newMinutes + 'am';
    }
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let date = month + '-' + day + '-' + year;

    let bid = {
      propertyId: propertyId,
      user: user,
      amount: amount,
      currentTime: time,
      date: date
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