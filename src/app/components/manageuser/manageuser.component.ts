import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserService } from '../../services/user.service';
import { response } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-manageuser',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
  templateUrl: './manageuser.component.html',
  styleUrl: './manageuser.component.scss',
})
export class ManageuserComponent implements OnInit {
  inputValue = '';
  displayedColumns: string[] = [];
  userData: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUser();
  }

  loadAllUser() {
    this.userService.loadAllUser().subscribe({
      next: (response: any) => {
        this.userData = response;
        this.loadAllKeys();
      },
      error: (error: any) => {
        console.error('Error loading dashboard:', error);
      },
    });
  }

  loadAllKeys() {
    if (this.userData && this.userData.length > 0) {
      this.displayedColumns = Object.keys(this.userData[0]).filter(
        (key) => !['__v', 'password'].includes(key)
      );
    } else {
      console.warn('No user data available.');
    }
  }

  changeUserStatus(event: any, id: string, status: boolean): void {
    status = !status;
    this.userService.changeUserStatus(status, id);
  }
}
