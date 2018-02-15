import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Investor } from '../models/Investor';

import 'rxjs/add/operator/map';

@Injectable()
export class InviteInvestorService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000/inviteinvestor';

  public inviteInvestor(investor: Investor) {
    let URI = this.serverApi + "/addinvestor";
    let headers = new Headers;
    let body = JSON.stringify({

    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, {headers: headers})
      .map(res => res.json());
  }
}