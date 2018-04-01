import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EditPropertyGuard } from './guards/edit-property.guard';
import { ProfileGuard } from './guards/profile.guard';
import { RegisterGuard } from './guards/register.guard';
import { RoleGuard } from './guards/role.guard';

import { AddPropertyComponent } from './add-property/add-property.component';
import { CustomizePropertyComponent } from './customize-property/customize-property.component';
import { ConnectionsComponent } from './connections/connections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { InviteLenderComponent } from './invite-lender/invite-lender.component';
import { InviteWholesalerComponent } from './invite-wholesaler/invite-wholesaler.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaceDealAdComponent } from './place-deal-ad/place-deal-ad.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SoldPropertyComponent } from './sold-property/sold-property.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewDealAdsComponent } from './view-deal-ads/view-deal-ads.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'addproperty', component: AddPropertyComponent, canActivate:[RoleGuard], data:{userType: 'Wholesaler'} },
  { path: 'connections', component: ConnectionsComponent, canActivate:[AuthGuard] },
  { path: 'customizeproperty/:id', component: CustomizePropertyComponent, canActivate:[RoleGuard], data:{userType: 'Investor'} },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'generateReport/:id', component: GenerateReportComponent, canActivate:[RoleGuard], data:{userType: 'Investor'} },
  { path: 'inviteinvestor', component: InviteInvestorComponent, canActivate:[RoleGuard], data:{userType: 'Wholesaler'} },
  { path: 'invitelender', component: InviteLenderComponent, canActivate:[AuthGuard] },
  { path: 'invitewholesaler', component: InviteWholesalerComponent, canActivate:[RoleGuard], data:{userType: 'Investor' } },
  { path: 'login', component: LoginComponent },
  { path: 'placeDealAd', component: PlaceDealAdComponent, canActivate:[RoleGuard], data:{userType: 'Investor'} },
  { path: 'profile/:id', component: MyProfileComponent, canActivate:[ProfileGuard] },
  { path: 'properties', component: ViewPropertiesComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[RegisterGuard] },
  { path: 'search', component: SearchComponent, canActivate:[AuthGuard] },
  { path: 'soldproperty/:id', component: SoldPropertyComponent, canActivate:[AuthGuard] },
  { path: 'user/:id', component: UserProfileComponent, canActivate:[AuthGuard] },
  { path: 'view/:id', component: ViewPropertyComponent, canActivate:[AuthGuard] },
  { path: 'viewDealAds', component: ViewDealAdsComponent, canActivate:[AuthGuard] },
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