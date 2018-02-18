import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Add in components
import { LoginComponent } from './login/login.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component'
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { RegisterComponent } from './register/register.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'properties', component: ViewPropertiesComponent },
  { path: 'properties/addproperty', component: AddPropertyComponent },
  { path: 'properties/editproperty/:id', component: EditPropertyComponent },
  { path: 'inviteinvestor', component: InviteInvestorComponent },
  { path: 'register', component: RegisterComponent },
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