import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './guards/auth.guard';
import { EditPropertyGuard } from './guards/edit-property.guard';
import { ProfileGuard } from './guards/profile.guard';
import { RegisterGuard } from './guards/register.guard';
import { RoleGuard } from './guards/role.guard';
import { FilterAddressPipe } from './pipes/filterAddress.pipe';
import { FilterCityPipe } from './pipes/filterCity.pipe';
import { FilterEmailPipe } from './pipes/filterEmail.pipe';
import { FilterFirstNamePipe } from './pipes/filterFirstName.pipe';
import { FilterLastNamePipe } from './pipes/filterLastName.pipe';
import { FilterPhoneNumberPipe } from './pipes/filterPhoneNumber.pipe';
import { FilterPropertyTypePipe } from './pipes/filterPropertyType.pipe';
import { FilterPurchasePricePipe } from './pipes/filterPurchasePrice.pipe';
import { FilterStatePipe } from './pipes/filterState.pipe';
import { FilterStatusPipe } from './pipes/filterStatus.pipe';
import { FilterUsernamePipe } from './pipes/filterUsername.pipe';

import { AppComponent } from './app.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ConnectionsComponent } from './connections/connections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { InviteLenderComponent } from './invite-lender/invite-lender.component';
import { InviteWholesalerComponent } from './invite-wholesaler/invite-wholesaler.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';

import { AddPropertyService } from './services/addProperty.service';
import { AuthService } from './services/auth.service';
import { DeletePropertyService } from './services/deleteProperty.service';
import { EditPropertyService } from './services/editProperty.service';
import { GetAllPropertiesService } from './services/getAllProperties.service';
import { GetConnectionsService } from './services/getConnections.service';
import { GetUserPropertiesService } from './services/getUserProperties.service';
import { InviteService } from './services/invite.service';
import { PhotosService } from './services/photos.service';
import { ProfileService } from './services/profile.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { ValidateService } from './services/validate.service';
import { ViewPropertyService } from './services/viewProperty.service';


@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    EditPropertyComponent,
    ConnectionsComponent,
    DashboardComponent,
    FilterAddressPipe,
    FilterCityPipe,
    FilterEmailPipe,
    FilterFirstNamePipe,
    FilterLastNamePipe,
    FilterPhoneNumberPipe,
    FilterPropertyTypePipe,
    FilterPurchasePricePipe,
    FilterStatePipe,
    FilterStatusPipe,
    FilterUsernamePipe,
    LoginComponent,
    MyProfileComponent,
    InviteInvestorComponent,
    InviteLenderComponent,
    InviteWholesalerComponent,
    PageNotFoundComponent,
    RegisterComponent,
    SearchComponent,
    SidebarComponent,
    TopNavbarComponent,
    UserProfileComponent,
    ViewPropertiesComponent,
    ViewPropertyComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AddPropertyService,
    DeletePropertyService,
    EditPropertyService,
    GetAllPropertiesService,
    GetConnectionsService,
    GetUserPropertiesService,
    InviteService,
    PhotosService,
    ProfileService,
    UserService,
    ValidateService,
    ViewPropertyService,
    AuthGuard,
    EditPropertyGuard,
    ProfileGuard,
    RegisterGuard,
    RoleGuard,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
