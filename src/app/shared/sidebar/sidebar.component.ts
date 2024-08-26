import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  constructor(public router: Router, private authService: AuthService) {}
  navItems = [
    { name: 'Dashboard', icon: 'dashboard', url: '/dashboard' },
    { name: 'Manage Category', icon: 'category', url: '/managecategory' },
    { name: 'Manage Products', icon: 'inventory', url: '/manageproduct' },
    { name: 'Manage Order', icon: 'receipt', url: '/manageorder' },
    { name: 'View Bill', icon: 'visibility', url: '/viewbill' },
    { name: 'Manage Users', icon: 'group', url: '/manageuser' },
  ];

  changePage(url: string) {
    const userIsLoggedIn = this.authService.isLoggedIn();
    if (userIsLoggedIn) {
      this.router.navigate([`/${url}`]);
    }
  }
}
