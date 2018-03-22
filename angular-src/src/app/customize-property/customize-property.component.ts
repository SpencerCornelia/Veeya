import { Component, OnInit, Input } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { Property } from '../models/Property';
import { User } from '../models/User';

import { CustomizePropertyService } from '../services/customizeProperty.service';

@Component({
  selector: 'app-customize-property',
  templateUrl: './customize-property.component.html',
  styleUrls: ['./customize-property.component.css']
})
export class CustomizePropertyComponent implements OnInit {

  private property: any;

  constructor(private customizePropertyService: CustomizePropertyService) { }

  ngOnInit() {
    this.customizePropertyService.getProperty()
      .subscribe((response) => {
        this.property = response;
      })
  }

}
