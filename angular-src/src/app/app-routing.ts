import { Routes, RouterModule } from '@angular/router';

// Add in components
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
import { AddPropertyComponent } from './add-property/add-property.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'properties', component: ViewPropertiesComponent },
  { path: 'properties/addproperty', component: AddPropertyComponent },
  { path: '**', redirectTo: '/properties' }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);