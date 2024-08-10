import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageorderComponent } from './components/manageorder/manageorder.component';
import { ManageproductComponent } from './components/manageproduct/manageproduct.component';
import { ManagecategoryComponent } from './components/managecategory/managecategory.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'managecategory', component: ManagecategoryComponent },
  { path: 'manageorder', component: ManageorderComponent },
  { path: 'manageproduct', component: ManageproductComponent },
];
