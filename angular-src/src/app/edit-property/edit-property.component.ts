import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

import { EditPropertyService } from '../services/editProperty.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  constructor(private currentProperty: Property, private editPropertyService: EditPropertyService, private router: Router) { }

  ngOnInit() {
    console.log("currentProperty =", this.currentProperty);
    /* Need to receive the property that was clicked from the click function
       and set the default values of the form to the values from the property
       being passed to this component
     */
  }

}
