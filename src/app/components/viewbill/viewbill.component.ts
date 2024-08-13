import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ViewbilldialogComponent } from '../viewbilldialog/viewbilldialog.component';

@Component({
  selector: 'app-viewbill',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './viewbill.component.html',
  styleUrl: './viewbill.component.scss',
})
export class ViewbillComponent {
  constructor(public dialog: MatDialog) {}
  value = '';

  ELEMENT_DATA: any[] = [
    {
      name: 'test',
      email: 'test@test.com',
      contactNumber: '0123456789',
      paymentMethod: 'Cash',
      total: 99.0,
    },
    {
      name: 'test2',
      email: 'test2@test.com',
      contactNumber: '23456789',
      paymentMethod: 'Krypto',
      total: 22.0,
    },
  ];

  displayedColumns: string[] = [
    'name',
    'email',
    'contactNumber',
    'paymentMethod',
    'total',
    'action',
  ];
  dataSource = this.ELEMENT_DATA;

  openViewBillDialog(element: any): void {
    this.dialog.open(ViewbilldialogComponent, {
      width: '500vw',
      data: element,
    });
  }
}
