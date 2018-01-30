import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Add in components
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { AddPropertyComponent } from './add-property/add-property.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'properties', component: ViewPropertiesComponent },
  { path: 'properties/addproperty', component: AddPropertyComponent },
  { path: '**', redirectTo: '/properties' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      APP_ROUTES,
      { enableTracing: true } // for debugging only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}