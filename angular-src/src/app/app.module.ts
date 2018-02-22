import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';

import { AddPropertyService } from './services/addProperty.service';
import { AuthService } from './services/auth.service';
import { DeletePropertyService } from './services/deleteProperty.service';
import { EditPropertyService } from './services/editProperty.service';
import { GetAllPropertiesService } from './services/getAllProperties.service';
import { InviteInvestorService } from './services/inviteInvestor.service';
import { ValidateService } from './services/validate.service';
import { GetWholesalerPropertiesService } from './services/getWholesalerProperties.service';
import { InviteWholesalerComponent } from './invite-wholesaler/invite-wholesaler.component';

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
    InviteWholesalerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AddPropertyService,
    AuthService,
    DeletePropertyService,
    EditPropertyService,
    GetAllPropertiesService,
    InviteInvestorService,
    ValidateService,
    GetWholesalerPropertiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
