import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

import { AppComponent } from './app.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { InviteWholesalerComponent } from './invite-wholesaler/invite-wholesaler.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

import { AddPropertyService } from './services/addProperty.service';
import { AuthService } from './services/auth.service';
import { DeletePropertyService } from './services/deleteProperty.service';
import { EditPropertyService } from './services/editProperty.service';
import { GetAllPropertiesService } from './services/getAllProperties.service';
import { InviteInvestorService } from './services/inviteInvestor.service';
import { InviteWholesalerService } from './services/invitewholesaler.service';
import { ValidateService } from './services/validate.service';
import { GetWholesalerPropertiesService } from './services/getWholesalerProperties.service';
import { ProfileService } from './services/profile.service';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    EditPropertyComponent,
    ViewPropertiesComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    InviteInvestorComponent,
    InviteWholesalerComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ProfileComponent,
    TopNavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    AddPropertyService,
    AuthService,
    DeletePropertyService,
    EditPropertyService,
    GetAllPropertiesService,
    InviteInvestorService,
    InviteWholesalerService,
    ValidateService,
    GetWholesalerPropertiesService,
    ProfileService,
    AuthGuard,
    RoleGuard,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
