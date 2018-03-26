import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomizePropertyService } from '../services/customizeProperty.service';

import { Property } from '../models/Property';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  private property: any;

  constructor(private customizePropertyService: CustomizePropertyService) { }

  ngOnInit() {
    if (this.customizePropertyService.customizedPropertyExists) {
      this.property = this.customizePropertyService.getCustomizedProperty();
      console.log("this.property EXISTS:", this.property)
    } else {
      this.customizePropertyService.getProperty()
        .subscribe((response) => {
          console.log("response:", response)
          this.property = response;
        })
    }
  }

}
