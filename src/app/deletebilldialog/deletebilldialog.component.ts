import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-deletebilldialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './deletebilldialog.component.html',
  styleUrl: './deletebilldialog.component.scss',
})
export class DeletebilldialogComponent {}
