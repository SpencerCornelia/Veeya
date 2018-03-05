import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

// Add in components
import { AddPropertyComponent } from './add-property/add-property.component';
import { ConnectionsComponent } from './connections/connections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { InviteWholesalerComponent } from './invite-wholesaler/invite-wholesaler.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { ViewPropertyComponent } from './view-property/view-property.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'connections', component: ConnectionsComponent, canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'properties', component: ViewPropertiesComponent, canActivate:[RoleGuard], data:{userType: 'Wholesaler'} },
  { path: 'properties/property/:id', component: ViewPropertyComponent, canActivate:[AuthGuard] },
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