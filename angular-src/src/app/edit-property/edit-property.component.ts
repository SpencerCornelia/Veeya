import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

import { EditPropertyService } from '../services/editProperty.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  private propertyID: string;
  private initialProperty;

  constructor(private route: ActivatedRoute, private editPropertyService: EditPropertyService, private router: Router) {
    this.propertyID = route.snapshot.params['id'];
    this.getProperty(this.propertyID);
  }

  getProperty(id) {
    this.editPropertyService.getPropertyByID(id)
      .subscribe((response) => {
        this.initialProperty = response;
    });
  }

  ngOnInit() {
  }

}
