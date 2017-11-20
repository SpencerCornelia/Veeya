import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AddPropertyComponent } from './add-property/add-property.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';

import { AddPropertyService } from './services/addProperty.service';
import { DeletePropertyService } from './services/deleteProperty.service';
import { GetAllPropertiesService } from './services/getAllProperties.service';

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    ViewPropertiesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [AddPropertyService, DeletePropertyService, GetAllPropertiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
