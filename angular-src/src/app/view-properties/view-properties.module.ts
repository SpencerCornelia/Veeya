import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ViewPropertyComponent } from '../view-property/view-property.component';
import { ViewPropertiesComponent } from '../view-properties/view-properties.component';

import { ViewPropertiesRoutingModule } from './view-properties-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewPropertiesRoutingModule
  ],
  declarations: [
    ViewPropertyComponent,
    ViewPropertiesComponent
  ]
})
export class ViewPropertiesModule {}