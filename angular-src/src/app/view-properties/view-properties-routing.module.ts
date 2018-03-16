import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewPropertiesComponent } from './view-properties.component';
import { ViewPropertyComponent } from '../view-property/view-property.component';

import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';


const viewPropertiesRoutes: Routes = [
  {
    path: 'properties',
    component: ViewPropertiesComponent,
    canActivate:[RoleGuard],
    data:{ userType: 'Wholesaler' },
    children: [
      {
        path: 'view/:id',
        component: ViewPropertyComponent,
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(viewPropertiesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ViewPropertiesRoutingModule { }