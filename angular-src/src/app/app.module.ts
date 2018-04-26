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

import { AppComponent } from './app.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AlertComponent } from './directives/alert/index';
import { AuctionComponent } from './auction/auction.component';
import { ConnectionsComponent } from './connections/connections.component';
import { CustomizePropertyComponent } from './customize-property/customize-property.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { InviteLenderComponent } from './invite-lender/invite-lender.component';
import { InviteWholesalerComponent } from './invite-wholesaler/invite-wholesaler.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaceDealAdComponent } from './place-deal-ad/place-deal-ad.component';
import { SearchComponent } from './search/search.component';
import { SoldPropertyComponent } from './sold-property/sold-property.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { UploadListComponent } from './upload-list/upload-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewDealAdsComponent } from './view-deal-ads/view-deal-ads.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';

import { AddConnectionService } from './services/addConnection.service';
import { AddPropertyService } from './services/addProperty.service';
import { AlertService } from './services/alert.service';
import { AuctionService } from './services/auction.service';
import { AuthService } from './services/auth.service';
import { CustomizePropertyService } from './services/customizeProperty.service';
import { DealAdService } from './services/dealAd.service';
import { DeletePropertyService } from './services/deleteProperty.service';
import { EditPropertyService } from './services/editProperty.service';
import { GetAllPropertiesService } from './services/getAllProperties.service';
import { GetConnectionsService } from './services/getConnections.service';
import { GetUserPropertiesService } from './services/getUserProperties.service';
import { InviteService } from './services/invite.service';
import { PhotosService } from './services/photos.service';
import { ProfileService } from './services/profile.service';
import { SoldPropertyService } from './services/soldProperty.service';
import { UploadListService } from './services/uploadListService';
import { UserService } from './services/user.service';
import { ValidateService } from './services/validate.service';
import { ViewPropertyService } from './services/viewProperty.service';

import { MyProfileResolve } from './resolvers/my-profile-resolve.service';


@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    AlertComponent,
    AuctionComponent,
    ConnectionsComponent,
    CustomizePropertyComponent,
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
    FooterComponent,
    GenerateReportComponent,
    LoginComponent,
    MyProfileComponent,
    InviteInvestorComponent,
    InviteLenderComponent,
    InviteWholesalerComponent,
    PageNotFoundComponent,
    PlaceDealAdComponent,
    RegisterComponent,
    SearchComponent,
    SidebarComponent,
    SoldPropertyComponent,
    TopNavbarComponent,
    UploadListComponent,
    UserProfileComponent,
    ViewDealAdsComponent,
    ViewPropertyComponent,
    ViewPropertiesComponent
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
    AddConnectionService,
    AuthService,
    AddPropertyService,
    AlertService,
    AuctionService,
    CustomizePropertyService,
    DealAdService,
    DeletePropertyService,
    EditPropertyService,
    GetAllPropertiesService,
    GetConnectionsService,
    GetUserPropertiesService,
    InviteService,
    PhotosService,
    ProfileService,
    SoldPropertyService,
    UploadListService,
    UserService,
    ValidateService,
    ViewPropertyService,
    AuthGuard,
    EditPropertyGuard,
    ProfileGuard,
    RegisterGuard,
    RoleGuard,
    Title,
    MyProfileResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
