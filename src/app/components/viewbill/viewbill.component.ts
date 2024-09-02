import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ViewbilldialogComponent } from '../viewbilldialog/viewbilldialog.component';
import { BillService } from '../../services/bill.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeletebilldialogComponent } from '../../deletebilldialog/deletebilldialog.component';
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
    MatPaginatorModule,
  ],
  templateUrl: './viewbill.component.html',
  styleUrl: './viewbill.component.scss',
})
export class ViewbillComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public dialog: MatDialog, private billService: BillService) {}
  ngAfterViewInit() {
    this.billData.paginator = this.paginator;
  }
  value = '';
  billData = new MatTableDataSource<any>();
  datalength: any;

  ngOnInit(): void {
    this.loadBills();
  }

  displayedColumns: string[] = [
    'name',
    'email',
    'contactNumber',
    'paymentMethod',
    'total',
    'action',
  ];

  loadBills(): void {
    this.billService.loadBills().subscribe((bills: any) => {
      this.billData.data = bills;
      this.datalength = bills.length;
    });
  }

  openViewBillDialog(element: any): void {
    this.dialog.open(ViewbilldialogComponent, {
      width: '500vw',
      data: element,
    });
  }

  openDeleteBill(bill: any, index: any) {
    let dialogRef = this.dialog.open(DeletebilldialogComponent, {
      width: '500px',
      data: {
        bill,
        index,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadBills();
    });
  }
}
