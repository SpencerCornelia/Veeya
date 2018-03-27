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

  private currentMonth: any;
  private currentYear: any;

  // set for previous year and next year buttons
  private finalPaymentYear: any;
  private firstYear: boolean = true;
  private lastYear: boolean = false;

  private property: any;

  constructor(private customizePropertyService: CustomizePropertyService) { }

  ngOnInit() {
    var date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.firstYear = date.getFullYear() == this.currentYear ? true : false;
    this.lastYear = this.finalPaymentYear == this.currentYear;

    if (this.customizePropertyService.customizedPropertyExists) {
      this.property = this.customizePropertyService.getCustomizedProperty();
      this.setLastYear();
      console.log("this.property EXISTS:", this.property)
    } else {
      this.customizePropertyService.getProperty()
        .subscribe((response) => {
          console.log("response:", response)
          this.property = response;
        })
    }
  }

  setLastYear() {
    this.finalPaymentYear = (this.property.numberOfPayments / 12) + this.currentYear;
    if (this.currentMonth == 'January') {
      this.finalPaymentYear = this.finalPaymentYear - 1;
    }
  }

}
