import { Component, OnInit, Input } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { Property } from '../models/Property';
import { User } from '../models/User';

import { CustomizePropertyService } from '../services/customizeProperty.service';

declare var $: any;

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

    this.property = {
        "_id": "5aaead5fefef19eb2662b924",
        "updated_at": "2018-03-18T18:18:08.000Z",
        "created_at": "2018-03-18T18:18:08.000Z",
        "wholesaler_id": "5aaea4a1ce0c02e9a020ac08",
        "address": "Second Property to Test",
        "city": "Las Vegas",
        "state": "NV",
        "zipCode": "89109",
        "purchasePrice": "240000",
        "bedrooms": 3,
        "bathrooms": 3,
        "expectedRehab": "25000",
        "afterRepairValue": "500000",
        "HOA": "125",
        "propertyTaxes": "100",
        "averageRent": "1900",
        "squareFootage": "1000",
        "propertyType": "Single Family",
        "yearBuilt": "1980",
        "status": "Listed",
        "utilities": "100",
        "insurance": "85",
        "sellerFinancing": "no",
        "__v": 0,
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/veeya-c0185.appspot.com/o/property-photos%2F5aaea4a1ce0c02e9a020ac08%2Froom.jpg?alt=media&token=d3b6dea5-6b5d-414f-8e56-6d1c61bd5166"
        ],
        "comps": [
            {
                "firstCompAddress": "",
                "firstCompPrice": ""
            },
            {
                "secondCompAddress": "",
                "secondCompPrice": ""
            },
            {
                "thirdCompAddress": "",
                "thirdCompPrice": ""
            }
        ]
    };
  }

  addExtraIncome() {
    $("#extraIncome").append("<div class='form-group'><label>New Div</label><input type='text' class='form-control' placeholder='test'/></div>");
  }

  addExtraFixedExpense() {

  }

  addExtraVariableExpense() {

  }

}
