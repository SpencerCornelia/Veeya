import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

// Add in components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component'
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { InviteWholesalerComponent } from './invite-wholesaler/invite-wholesaler.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  // { path: 'properties', component: ViewPropertiesComponent, canActivate:[RoleGuard], data:{userType: 'Wholesaler'} },
  { path: 'properties/addproperty', component: AddPropertyComponent, canActivate:[RoleGuard], data:{userType: 'Wholesaler'} },
  { path: 'properties/editproperty/:id', component: EditPropertyComponent, canActivate:[RoleGuard], data:{userType: 'Wholesaler'} },
  { path: 'inviteinvestor', component: InviteInvestorComponent, canActivate:[RoleGuard], data:{userType: 'Wholesaler'} },
  { path: 'invitewholesaler', component: InviteWholesalerComponent, canActivate:[RoleGuard], data:{userType: 'Investor' } },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
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