import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { GetWholesalerPropertiesService } from '../services/getWholesalerProperties.service';

import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private properties: Property[] = [];
  private userID: String;
  private userType: String;

  constructor(private getWholesalerPropertiesService: GetWholesalerPropertiesService) { }

  ngOnInit() {
    this.userID = localStorage.getItem('user_id');
    this.userType = localStorage.getItem('user_type');
  }

}
