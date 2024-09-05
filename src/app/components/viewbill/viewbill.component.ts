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
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { DeletebilldialogComponent } from '../../deletebilldialog/deletebilldialog.component';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
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
  constructor(
    public dialog: MatDialog,
    private billService: BillService,
    private snackbarService: SnackbarService
  ) {}
  ngAfterViewInit() {
    // this.billData.paginator = this.paginator;
  }
  value = '';
  billData = new MatTableDataSource<any>();
  datalength: any;
  page: any = 1;
  pageSize: any = 5;

  ngOnInit(): void {
    this.loadBills(this.page, this.pageSize);
  }

  displayedColumns: string[] = [
    'name',
    'email',
    'contactNumber',
    'paymentMethod',
    'total',
    'action',
  ];

  loadBills(page?: any, limit?: any): void {
    this.billService
      .loadBills(page, limit)
      .pipe(
        tap((data: any) => {
          if (data.bill.length > 0) {
            this.billData.data = data.bill;
            this.datalength = data.billCounter;
            this.snackbarService.openSnackbar('Bills loaded', '');
          } else {
            this.snackbarService.openSnackbar('No Bills found', 'Error');
          }
        }),
        catchError((err: any) => {
          this.snackbarService.openSnackbar(err.message, 'Error');
          return of(null);
        })
      )
      .subscribe();
  }

  onPageChange(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.loadBills(this.page, this.pageSize);
  }

  openViewBillDialog(element: any): void {
    this.dialog.open(ViewbilldialogComponent, {
      width: '500vw',
      data: element,
    });
  }

  getpdf(bill: any) {
    this.billService
      .getpdf(bill)
      .pipe(
        catchError((err: any) => {
          this.snackbarService.openSnackbar(err.message, 'error');
          return of(null); // Return null in case of error
        })
      )
      .subscribe(
        (blob: Blob | null) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${bill.uuid}.pdf`; // Assuming `data` contains the `uuid`
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          } else {
            console.error('Failed to download PDF: No blob data received');
          }
        },
        (error) => {
          console.error('Error downloading the PDF', error);
        }
      );
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
