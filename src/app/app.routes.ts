import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageorderComponent } from './components/manageorder/manageorder.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'manageorder', component: ManageorderComponent },
];
