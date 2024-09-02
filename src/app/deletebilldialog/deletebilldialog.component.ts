import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-deletebilldialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './deletebilldialog.component.html',
  styleUrl: './deletebilldialog.component.scss',
})
export class DeletebilldialogComponent {
  constructor(
    private billService: BillService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public deleteDataInformation: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  deleteBill() {
    this.billService
      .deleteBill(this.deleteDataInformation.bill._id)
      .subscribe((result: any) => {});
    this.dialogRef.close();
  }
}
