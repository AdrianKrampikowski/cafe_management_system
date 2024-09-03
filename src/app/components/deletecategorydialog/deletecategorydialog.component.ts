import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-deletecategorydialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './deletecategorydialog.component.html',
  styleUrl: './deletecategorydialog.component.scss',
})
export class DeletecategorydialogComponent {
  constructor(
    private dashboardService: DashboardService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public deleteDataInformation: any
  ) {}

  deleteCategory() {
    console.log('deleteDataInformation', this.deleteDataInformation);
    this.dashboardService
      .deleteCategory(this.deleteDataInformation.id)
      .subscribe((result: any) => {
        this.dialogRef.close(result);
      });
  }

  closeDialog() {
    this.dialogRef.close('false');
  }
}
