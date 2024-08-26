import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageorderComponent } from './components/manageorder/manageorder.component';
import { ManageproductComponent } from './components/manageproduct/manageproduct.component';
import { ManagecategoryComponent } from './components/managecategory/managecategory.component';
import { ViewbillComponent } from './components/viewbill/viewbill.component';
import { ManageuserComponent } from './components/manageuser/manageuser.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { path: 'managecategory', component: ManagecategoryComponent },
  { path: 'manageorder', component: ManageorderComponent },
  { path: 'manageproduct', component: ManageproductComponent },
  { path: 'viewbill', component: ViewbillComponent },
  { path: 'manageuser', component: ManageuserComponent },
];
