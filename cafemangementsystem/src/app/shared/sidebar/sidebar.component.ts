import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import { AppComponent } from './app.component';
// import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor() {}
  navItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Manage Products', icon: 'inventory' },
    { name: 'Manage Order', icon: 'receipt' },
    { name: 'View Bill', icon: 'visibility' },
    { name: 'Manage Users', icon: 'group' },
  ];
}
