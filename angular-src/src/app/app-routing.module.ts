import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Add in components
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component'
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'properties', component: ViewPropertiesComponent },
  { path: 'properties/addproperty', component: AddPropertyComponent },
  { path: 'properties/editproperty/:id', component: EditPropertyComponent },
  { path: 'inviteinvestor', component: InviteInvestorComponent },
  { path: '**', redirectTo: '/properties' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      APP_ROUTES
      /*{ enableTracing: true } for debugging only */
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}