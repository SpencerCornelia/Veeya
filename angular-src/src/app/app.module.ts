import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

import { AddPropertyService } from './services/addProperty.service';
import { AuthService } from './services/auth.service';
import { ConnectionsComponent } from './connections/connections.component';
import { DeletePropertyService } from './services/deleteProperty.service';
import { EditPropertyService } from './services/editProperty.service';
import { GetAllPropertiesService } from './services/getAllProperties.service';
import { GetConnectionsService } from './services/getConnections.service';
import { GetUserPropertiesService } from './services/getUserProperties.service';
import { InviteInvestorService } from './services/inviteInvestor.service';
import { InviteWholesalerService } from './services/invitewholesaler.service';
import { PhotosService } from './services/photos.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';
import { ValidateService } from './services/validate.service';


@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    EditPropertyComponent,
    ConnectionsComponent,
    DashboardComponent,
    LoginComponent,
    InviteInvestorComponent,
    InviteWholesalerComponent,
    PageNotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    SidebarComponent,
    TopNavbarComponent,
    ViewPropertiesComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AddPropertyService,
    AuthService,
    DeletePropertyService,
    EditPropertyService,
    GetAllPropertiesService,
    GetConnectionsService,
    InviteInvestorService,
    InviteWholesalerService,
    PhotosService,
    ProfileService,
    UserService,
    ValidateService,
    AuthGuard,
    RoleGuard,
    Title,
    GetUserPropertiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
