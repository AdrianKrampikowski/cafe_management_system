import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-viewbilldialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './viewbilldialog.component.html',
  styleUrl: './viewbilldialog.component.scss',
})
export class ViewbilldialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  ELEMENT_DATA: any[] = [
    {
      name: 'test',
      category: 'test@test.com',
      price: '0123456789',
      quantity: 'Cash',
      total: 99.0,
    },
  ];

  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'quantity',
    'total',
  ];
  dataSource = this.ELEMENT_DATA;
}
