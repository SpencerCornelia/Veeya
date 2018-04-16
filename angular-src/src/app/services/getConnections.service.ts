import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

import 'rxjs/add/operator/map';

@Injectable()
export class GetConnectionsService {

  constructor(private http: Http, private authService: AuthService) { }

  private pendingConnections: any;
  private observable: Observable<any>;

  private serverApi = 'http://localhost:3000';

  public getConnectionsForUser(userId: string):Observable<User[]> {
    let URI = this.serverApi + `/user/connections/${userId}`;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <User[]>res.data);
  }

  public getPendingConnections() {
    if (this.pendingConnections) {
      return Observable.of(this.pendingConnections);
    } else if (this.observable) {
      return this.observable;
    } else {
      let userId = this.authService.loggedInUser();
      let URI = this.serverApi + `/user/pendingconnections/${userId}`;

      this.observable = this.http.get(URI)
        .map((response) => {
          this.observable = null;
          this.pendingConnections = response.json();
          this.pendingConnections = this.pendingConnections.data;
          return this.pendingConnections;
        })
        .catch((error) => {
          return Observable.throw(error.json());
        })
        .share();
        return this.observable;
    }
  }

}