import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageorderComponent } from './components/manageorder/manageorder.component';
import { ManageproductComponent } from './components/manageproduct/manageproduct.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manageorder', component: ManageorderComponent },
  { path: 'manageproduct', component: ManageproductComponent },
];
