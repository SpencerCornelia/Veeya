import { Component, OnInit } from '@angular/core';

import { Property } from '../models/Property';
import { User } from '../models/User';

import { ViewPropertyService } from '../services/viewProperty.service';

@Component({
  selector: 'app-sold-property',
  templateUrl: './sold-property.component.html',
  styleUrls: ['./sold-property.component.css']
})
export class SoldPropertyComponent implements OnInit {

  private currentUser: User;
  private property: Property;

  constructor(private viewPropertyService: ViewPropertyService) { }

  ngOnInit() {

    this.currentUser = {
      userType: '',
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      phoneNumber: '',
      city: '',
      state: '',
      URLs: {
        personal: '',
        facebook: '',
        linkedIn: '',
        biggerPockets: ''
      }
    }
  }

  getProperty() {
    this.viewPropertyService.getProperty()
      .subscribe((property) => {
        this.property = property;
      })
  }

}
